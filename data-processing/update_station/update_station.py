import csv
import argparse
import datetime
import re
import sys

sys.path.append('../')
import database

con = database.getConnection()
cur = con.cursor()


def update_station(line_id, station_id, length, length_between):
    cur.execute(
        'update line_station set length = %s, length_between = %s'
        ' where station_id = %s and line_id = %s',
        (length, length_between, station_id, line_id)
    )
    print('{}, {}'.format(length, length_between))


csv_r = csv.DictReader(open('./input.tsv'), delimiter='\t')
try:
    for row in csv_r:
        row['length'] = None if row['length'] == '' else row['length']
        row['length_between'] = None if row['length_between'] == '' else row['length_between']
        update_station(row['line_id'], row['station_id'],
                       row['length'], row['length_between'])
    cur.close()
    con.commit()
except Exception as e:
    print(e)
    cur.close()
    con.rollback()
