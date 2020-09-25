import dataclasses
import os
import json
import typing
import argparse
import geojson

import psycopg2
from shapely import wkb
from shapely.geometry import LineString, Point, MultiLineString, mapping


@dataclasses.dataclass
class Station():
    station_name: str
    geometry: Point


@dataclasses.dataclass
class TrainLine():
    train_code: str
    train_name: str
    color: str
    geometry: MultiLineString

    def to_geojson_dict(self) -> dict:
        return {
            'type': 'Feature',
            'geometry': {
                'type': 'MultiLineString',
                'coordinates': mapping(self.geometry)['coordinates']
            },
            'properties': {
                'trainName': self.train_name,
            },
        }


@dataclasses.dataclass
class TrainStation():
    train_code: str
    station_name: str
    geometry: Point

    def to_geojson_dict(self) -> dict:
        return {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': mapping(self.geometry)['coordinates']
            },
            'properties': {
                'stationName': self.station_name,
            },
        }


class PostGIS:
    @dataclasses.dataclass
    class Station:
        geom: str
        station_name: str

    @dataclasses.dataclass
    class Line:
        geom: str

    def __init__(self) -> None:
        self.con = psycopg2.connect(host='localhost', port='15432', user='user',
                                    password='password', dbname='express_map')

    def get_station(self, id: int):
        cur = self.con.cursor()
        cur.execute('select geom, n05_011 from station s where s.gid = %s', (id,))
        res = cur.fetchone()
        return PostGIS.Station(geom=res[0], station_name=res[1])

    def get_line(self, id: int):
        cur = self.con.cursor()
        cur.execute('select st_linemerge((select geom from line l where l.gid = %s))', (id,))
        res = cur.fetchone()
        return PostGIS.Line(geom=res[0])


postgis = PostGIS()


def split_line_string(line_string: LineString, point: Point) -> typing.Tuple[LineString, LineString]:
    coords = line_string.coords
    j = None
    for i in range(len(coords) - 1):
        if LineString(coords[i:i+2]).intersects(point):
            j = i
            break
    if j is None:
        raise Exception("Point doesn't exists in line.")
    if j == 0:
        return None, line_string
    if j + 2 == len(coords):
        return line_string, None
    if Point(coords[j + 1:j + 2]).equals(point):
        return LineString(coords[:j + 2]), LineString(coords[j + 1:])
    return LineString(coords[:j + 1]), LineString(coords[j:])


def generate_train_line(config: dict) -> MultiLineString:
    line_sections = []
    for section_config in config['line_sections']:
        start_station = wkb.loads(
            postgis.get_station(section_config['start']['id']).geom,
            hex=True
        )
        end_station = wkb.loads(
            postgis.get_station(section_config['end']['id']).geom,
            hex=True
        )
        line = wkb.loads(
            postgis.get_line(section_config['line']['id']).geom,
            hex=True
        )

        if line.intersects(start_station) is False:
            raise Exception(
                "Start station doesn't exists in line.: {}".format(
                    section_config['start']['remarks'])
            )
        if line.intersects(end_station) is False:
            raise Exception(
                "End station doesn't exists in line.: {}".format(
                    section_config['end']['remarks'])
            )

        split_start_lines = split_line_string(line, start_station)
        tmp_line = split_start_lines[0] \
            if split_start_lines[0] is not None and split_start_lines[0].intersects(end_station) \
            else split_start_lines[1]

        split_lines = split_line_string(tmp_line, end_station)
        split_line = split_lines[0] \
            if split_lines[0] is not None and split_lines[0].intersects(start_station) \
            else split_lines[1]

        line_sections.append(split_line)

    return MultiLineString(line_sections)


def get_train_stations(config: dict) -> typing.List[TrainStation]:
    station_ids = []
    for i, line_section in enumerate(config['line_sections']):
        if i == 0:
            station_ids.append(line_section['start']['id'])
        station_ids.append(line_section['end']['id'])
    train_stations = []
    for id in station_ids:
        station = postgis.get_station(id)
        train_stations.append(TrainStation(
            station_name=station.station_name,
            train_code=config['code'],
            geometry=wkb.loads(station.geom, hex=True)
        ))
    return train_stations


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--config', required=True)
    parser.add_argument('--dry-run', action='store_true')
    params = parser.parse_args()

    config_path = os.path.join(os.getcwd(), params.config)
    if os.path.exists(config_path) is False:
        raise Exception('Config file does not exist: {}'.format(config_path))
    with open(config_path) as f:
        config = json.load(f)

    train_line = TrainLine(
        train_code=config['code'],
        train_name=config['name'],
        color=config['color'],
        geometry=generate_train_line(config),
    )
    train_stations = get_train_stations(config)

    train_line_geojson = train_line.to_geojson_dict()
    train_station_geojsons = [train_station.to_geojson_dict() for train_station in train_stations]

    geojson_dict = {
        'type': 'FeatureCollection',
        'features': [train_line_geojson] + train_station_geojsons
    }

    if params.dry_run is True:
        # print(train_line)
        pass
    else:
        with open('./aaaa', 'w') as f:
            json.dump(geojson_dict, f, ensure_ascii=False)
