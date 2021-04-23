import argparse
import csv
import os
import pandas
import traceback
from csv_reader import CsvReader
from database import get_connection
from typing import List


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


def get_query(data: dict):
    insert_columns = ['year']
    insert_values = [year]
    insert_escapes = ['%s']
    update_columns = []
    update_values = []

    for k, v in data.items():
        insert_columns.append(k)
        insert_values.append(None if v == '' else v)
        insert_escapes.append('%s')
        if k == 'company_id':
            continue
        update_columns.append(k)
        update_values.append(None if v == '' else v)

    columns = ','.join(insert_columns)
    escapes = ','.join(insert_escapes)
    update = ','.join(['{} = %s'.format(col) for col in update_columns])

    sql = 'insert into company_statistics ({}) values ({}) on duplicate key update {}'.format(
        columns, escapes, update)

    return (sql, tuple(insert_values + update_values))


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
    df = pandas.read_csv(os.path.join('./', config.input_file_path))

    skip_records = []

    df['company_id'] = None
    for i, row in df.iterrows():
        company_id = get_company_id(row['company_name'])
        if company_id == None:
            skip_records.append(row[['company_name']].to_dict())
            df.drop(i, inplace=True)
            continue
        df.at[i, 'company_id'] = company_id

    df_dup = df[df.duplicated('company_id', keep=False)]
    if len(df_dup.index) > 0:
        print('company_id が重複する行があります')
        print(df_dup[['company_id', 'company_name']])
        raise Exception

    df.drop('company_name', axis=1, inplace=True)

    queries = []
    for i, row in df.iterrows():
        queries.append(get_query(row.to_dict()))

    if len(skip_records) > 0:
        with open('./skip_records.csv', mode='w', newline='', encoding='utf-8') as f:
            w = csv.DictWriter(f, fieldnames=skip_records[0].keys())
            w.writeheader()
            w.writerows(skip_records)

    update(queries)


argparser = argparse.ArgumentParser()
argparser.add_argument('--dry-run', dest='dry_run', action='store_false')
argparser.add_argument('--input-file', dest='input_file', required=True)
argparser.add_argument('--year', dest='year', required=True)

args = argparser.parse_args()
year = args.year

config = Config(args)

main(config)
