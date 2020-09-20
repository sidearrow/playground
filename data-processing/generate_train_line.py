import os
import json
import typing
import argparse
from dataclasses import dataclass

import psycopg2
from shapely import wkb
from shapely.geometry import LineString, Point
from shapely.geometry.multilinestring import MultiLineString


def get_connection():
    return psycopg2.connect(host='localhost', port='15432', user='user', password='password', dbname='express_map')


class Station():
    def __init__(self, geom: str, station_name: str) -> None:
        self.feature = wkb.loads(geom, hex=True)
        self.station_name = station_name

    @property
    def geojson(self) -> dict:
        return {
            'type': 'Feature',
            'properties': {
                'station_name': self.station_name,
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    self.feature.xy[0][0],
                    self.feature.xy[1][0],
                ],
            }
        }


@dataclass
class Train():
    code: str
    name: str
    color: str
    stations: dict
    geom: str


def get_station(id: int) -> Station:
    cur = get_connection().cursor()
    cur.execute('select geom, n05_011 from station s where s.gid = %s', (id,))
    res = cur.fetchone()
    return Station(geom=res[0], station_name=res[1])


def get_line(id: int) -> str:
    cur = get_connection().cursor()
    cur.execute('select st_linemerge((select geom from line l where l.gid = %s))', (id,))
    res = cur.fetchone()
    return res[0]


def create_train(train: Train):
    with get_connection() as con:
        cur = con.cursor()
        cur.execute(
            'insert into train(code, geom, name, color, stations)'
            ' values (%s, %s, %s, %s, %s)',
            (train.code, train.geom, train.name, train.color, json.dumps(train.stations))
        )
    con.commit()


def split(line_string: LineString, point: Point) -> typing.Tuple[LineString, LineString]:
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
        start_station = get_station(section_config['start']['id']).feature
        end_station = get_station(section_config['end']['id']).feature
        line = wkb.loads(get_line(section_config['line']['id']), hex=True)

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

        split_start_lines = split(line, start_station)
        tmp_line = split_start_lines[0] \
            if split_start_lines[0] is not None and split_start_lines[0].intersects(end_station) \
            else split_start_lines[1]

        split_lines = split(tmp_line, end_station)
        split_line = split_lines[0] \
            if split_lines[0] is not None and split_lines[0].intersects(start_station) \
            else split_lines[1]

        line_sections.append(split_line)

    return MultiLineString(line_sections)


def get_line_station_geojsons(config: dict) -> dict:
    station_ids = []
    for i, line_section in enumerate(config['line_sections']):
        if i == 0:
            station_ids.append(line_section['start']['id'])
        station_ids.append(line_section['end']['id'])
    stations = []
    for station_id in station_ids:
        station = get_station(station_id)
        stations.append(station.geojson)
    return stations


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

    code = config['code']
    train_stations = get_line_station_geojsons(config)
    train_line = generate_train_line(config)

    train = Train(
        code=config['code'],
        name=config['name'],
        color=config['color'],
        stations=train_stations,
        geom=train_line.wkb_hex,
    )

    if params.dry_run is True:
        print(train_line)
    else:
        create_train(train)
