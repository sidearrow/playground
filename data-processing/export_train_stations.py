import json
import psycopg2

con = psycopg2.connect(host='localhost', port='15432', user='user', password='password', dbname='express_map')
cur = con.cursor()

cur.execute('select code, stations_geojson from train')
rows = cur.fetchall()

res = {row[0]: row[1] for row in rows}

with open('./train_stations.json', 'wt')as f:
    json.dump(res, f, ensure_ascii=False)
