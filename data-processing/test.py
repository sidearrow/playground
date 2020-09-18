import json
import typing
import psycopg2
from shapely import wkb, ops
from shapely.geometry import LineString, Point
from shapely.geometry.multilinestring import MultiLineString


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
    if j == 0:
        return None, line_string
    if j + 2 == len(coords):
        return line_string, None
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


with open('./uzushio.json') as f:
    config = json.load(f)

line_config = config['line']

line_sections = []
for section_config in config['line']:
    start_station = wkb.loads(get_station(section_config['start']['id']), hex=True)
    end_station = wkb.loads(get_station(section_config['end']['id']), hex=True)
    line = wkb.loads(get_line(section_config['line']['id']), hex=True)

    if line.intersects(start_station) is False:
        raise Exception("Start station doesn't exists in line.: {}".format(section_config['start']['remarks']))
    if line.intersects(end_station) is False:
        raise Exception("End station doesn't exists in line.: {}".format(section_config['end']['remarks']))

    split_start_lines = split(line, start_station)
    tmp_line = split_start_lines[0] \
        if split_start_lines[0] is not None and split_start_lines[0].intersects(end_station) \
        else split_start_lines[1]

    split_lines = split(tmp_line, end_station)
    split_line = split_lines[0] \
        if split_lines[0] is not None and split_lines[0].intersects(start_station) \
        else split_lines[1]

    line_sections.append(split_line)

line = MultiLineString(line_sections)

print(line)
