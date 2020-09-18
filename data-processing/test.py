import json
import typing
import psycopg2
from shapely import wkb, ops
from shapely.geometry import LineString, Point


con = psycopg2.connect(host='localhost', port='15432', user='user', password='password', dbname='express_map')
cur = con.cursor()


def split(line_string: LineString, point: Point) -> typing.Tuple[LineString, LineString]:
    coords = line_string.coords
    j = None
    for i in range(len(coords) - 1):
        if LineString(coords[i:i+2]).intersects(point):
            j = i
            break
    if j is None:
        raise Exception("Point doesn't exists in line.")
    if j + 2 == len(coords):
        return LineString(coords[:j + 2]), None
    if Point(coords[j + 1:j + 2]).equals(point):
        return LineString(coords[:j + 2]), LineString(coords[j + 1:])
    return LineString(coords[:j + 1]), LineString(coords[j:])


def get_station(id: int) -> str:
    cur.execute('select geom from station s where s.gid = %s', (id,))
    res = cur.fetchone()
    return res[0]


def get_line(id: int) -> str:
    cur.execute('select st_linemerge((select geom from line l where l.gid = %s))', (id,))
    res = cur.fetchone()
    return res[0]


with open('./haruka.json') as f:
    config = json.load(f)

line_config = config['line']

for section_config in config['line']:
    start_station = wkb.loads(get_station(section_config['start']['id']), hex=True)
    end_station = wkb.loads(get_station(section_config['end']['id']), hex=True)
    line = wkb.loads(get_line(section_config['line']['id']), hex=True)

    if line.intersects(start_station) is False:
        raise Exception("Start station doesn't exists in line.")
    if line.intersects(end_station) is False:
        raise Exception("End station doesn't exists in line.")

    split_start_lines = split(line, start_station)
    tmp_line = split_start_lines[0] \
        if split_start_lines[0] is not None and split_start_lines[0].intersects(end_station) \
        else split_start_lines[1]

    split_lines = split(tmp_line, end_station)
    split_line = split_lines[0] \
        if split_lines[0] is not None and split_lines[0].intersects(start_station) \
        else split_lines[1]

    print(split_line)
