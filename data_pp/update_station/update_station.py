import csv
import argparse
import re
import sys

sys.path.append('../')
import database

LINE_ID = '11101'

con = database.getConnection()
cur = con.cursor()


def get_station_id(station_name):
    cur.execute(
        'select ls.station_id from line_station ls'
        ' left join station s on ls.station_id = s.station_id'
        ' where s.station_name = %s and ls.line_id = %s',
        (station_name, LINE_ID))
    row = cur.fetchone()
    if row == None:
        raise Exception('not found {}'.format(station_name))
    return row['station_id']


def clean_station_name(station_name):
    res = re.findall('(.*)駅', station_name)
    if len(res) < 1:
        raise Exception()
    return res[0]


def update_station(station_id, length, length_between):
    cur.execute(
        'update line_station set length = %s, length_between = %s'
        ' where station_id = %s and line_id = %s',
        (length, length_between, station_id, LINE_ID)
    )
    print('{}, {}'.format(length, length_between))


parser = argparse.ArgumentParser()
parser.add_argument('-d', '--dry-run', action='store_true')
args = parser.parse_args()

csv_r = csv.DictReader(open('./input.csv'))

print(args.dry_run)
try:
    for row in csv_r:
        station_name = clean_station_name(row['station_name'])
        station_id = get_station_id(station_name)
        if args.dry_run:
            print('{}, {}, {}, {}'.format(
                station_id, station_name, row['length'], row['length_between']))
        else:
            update_station(station_id, row['length'], row['length_between'])
    cur.close()
    con.commit()
except Exception as e:
    print(e)
    cur.close()
    con.rollback()
