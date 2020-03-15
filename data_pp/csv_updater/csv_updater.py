import csv
import sys

sys.path.append('../')
import database

TABLE_NAME = 'company_name'

f = open('./input.csv')
csvReader = csv.reader(f)

f = open('./out.sql', mode='w')

column_name_list = []
columns = ''
sql = 'insert {table} ({columns}) values ({values})'
for i, row in enumerate(csvReader):
    if i == 0:
        column_name_list.extend(row)
        columns = ', '.join(column_name_list)
        continue
    modsql = sql.format(table=TABLE_NAME, columns=columns, values=', '.join(map(lambda v: "'{}'".format(v), row)))
    f.write(modsql + ';\n')
