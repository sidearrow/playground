import dataclasses
from dataclasses import dataclass
import os
import json
from os import name
import typing
import argparse

import psycopg2
from shapely import wkb
from shapely.geometry import LineString, Point
from shapely.geometry.multilinestring import MultiLineString


def get_connection():
    return psycopg2.connect(host='localhost', port='15432', user='user', password='password', dbname='express_map')


@dataclasses.dataclass
class Station():
    station_name: str
    geom: str

    @property
    def geometry(self) -> Point:
        return wkb.loads(self.geom, hex=True)


@dataclasses.dataclass
class Train():
    train_code: str
    train_name: str
    color: str
    geom: str


@dataclasses.dataclass
class TrainStation():
    train_code: str
    station_name: str
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


def bulk_insert_train_and_train_stations(train: Train, train_stations: typing.List[TrainStation]):
    with get_connection() as con:
        cur = con.cursor()
        cur.execute(
            'insert into train(train_code, train_name, color, geom)'
            ' values (%s, %s, %s, %s, %s)',
            (train.train_code, train.train_name, train.color, train.geom)
        )
        for train_station in train_stations:
            cur.execute(
                'insert into train_station(train_code, station_name, geom)'
                ' values (%s, %s, %s)',
                (train_station.train_code, train_station.station_name, train_station.geom)
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
        start_station = get_station(section_config['start']['id']).geometry
        end_station = get_station(section_config['end']['id']).geometry
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


def get_line_stations(config: dict) -> typing.List[Station]:
    station_ids = []
    for i, line_section in enumerate(config['line_sections']):
        if i == 0:
            station_ids.append(line_section['start']['id'])
        station_ids.append(line_section['end']['id'])
    stations = [get_station(id) for id in station_ids]
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

    train_line = generate_train_line(config)
    train = Train(
        train_code=config['code'],
        train_name=config['name'],
        color=config['color'],
        geom=train_line.wkb_hex,
    )
    train_stations = [
        TrainStation(
            train_code=config['code'],
            station_name=station.station_name,
            geom=station.geom,
        )
        for station in get_line_stations(config)
    ]

    if params.dry_run is True:
        print(train_line)
    else:
        bulk_insert_train_and_train_stations(train, train_stations)
