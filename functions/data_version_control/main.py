import csv
import pymysql

EXP_TABLES = [
    'company',
    'line',
    'station',
    'line_station',
]

con = pymysql.connections.Connection(
    host='35.193.206.110',
    port=3306,
    user='railway_statistics',
    password='railway_statistics',
    database='railway_statistics',
    cursorclass=pymysql.cursors.DictCursor
)

cur = con.cursor()

for table in EXP_TABLES:
    sql = open('./sql/exp_{}.sql'.format(table), 'r').read()
    cur.execute(sql)
    data = cur.fetchall()
    if len(data) == 0:
        continue

    w = csv.DictWriter(open('./export_data/{}.csv'.format(table), 'w'), fieldnames=data[0].keys())
    w.writeheader()
    w.writerows(data)

con.close()
