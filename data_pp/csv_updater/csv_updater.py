import sys
import csv

sys.path.append('../')
import database  # nopep

con = database.getConnection()
cur = con.cursor()

TABLE_NAME = 'company_name'

is_dry_run = False


def get_company_id_list():
    cur.execute('select company_id, company_name from company_name')
    rows = cur.fetchall()

    res = {}
    for row in rows:
        res[row['company_name']] = row['company_id']

    return res


def update_company_length(data):
    if int(data['company_id']) == 999:
        return
    sql = 'update company set length = %s where company_id = %s'
    print(sql % (data['length'], data['company_id']))
    if not is_dry_run:
        cur.execute(sql, (data['length'], data['company_id']))


f = open('./input.csv')
csvReader = csv.DictReader(f)

# f = open('./out.sql', mode='w')

company_id_list = get_company_id_list()

try:
    for row in csvReader:
        row['company_id'] = company_id_list[row['company_name']]
        update_company_length(row)
    con.commit()
except Exception as e:
    con.rollback()
    raise e
finally:
    cur.close()
    con.close()
