import argparse
import csv
import os
import traceback
from csv_reader import CsvReader
from database import get_connection


con = get_connection()
year = None


class Config:
    def __init__(self, args):
        self.is_dry_run = bool(args.dry_run)
        self.input_file_path = os.path.join('./', args.input_file)


def get_company_id(company_name):
    cur = con.cursor()
    cur.execute(
        'select company_id from company_name_alias where company_name = %s', (company_name))
    row = cur.fetchone()

    return None if row == None else row['company_id']


def get_query(company_id, data: dict):
    columns = ['company_id', 'year']
    values = [company_id, year]
    escapes = ['%s', '%s']
    for k, v in data.items():
        columns.append(k)
        values.append(None if v == '' else v)
        escapes.append('%s')

    columns = ','.join(columns)
    escapes = ','.join(escapes)
    sql = 'insert into company_statistics ({}) values ({})'.format(
        columns, escapes)

    return (sql, tuple(values))


def update(queries: list):
    cur = con.cursor()
    try:
        for (query, params) in queries:
            cur.execute(query, params)
        con.commit()
    except:
        con.rollback()
        print(traceback.format_exc(5))


def main(config: Config):
    data = CsvReader.get(os.path.join('./', config.input_file_path))

    queries = []
    error_rows = []
    for row in data:
        company_id = get_company_id(row['company_name'])
        if company_id == None:
            error_rows.append(row)
            continue
        del row['company_name']
        queries.append(get_query(company_id, row))

    if len(error_rows) > 0:
        with open('./error.csv', mode='w', newline='', encoding='utf-8') as f:
            w = csv.DictWriter(f, fieldnames=error_rows[0].keys())
            w.writeheader()
            w.writerows(error_rows)

    update(queries)


argparser = argparse.ArgumentParser()
argparser.add_argument('--dry-run', dest='dry_run', action='store_false')
argparser.add_argument('--input-file', dest='input_file', required=True)
argparser.add_argument('--year', dest='year', required=True)

args = argparser.parse_args()
year = args.year

config = Config(args)

main(config)
