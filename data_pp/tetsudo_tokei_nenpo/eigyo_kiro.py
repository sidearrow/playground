import argparse
import csv
import json
import database

FILE_PATH = './eigyo_kiro_2018.csv'

if __name__ == '__main__':
    f = open(FILE_PATH)
    csvReader = csv.reader(f)

    res = []
    for i, row in enumerate(csvReader):
        if i <= 6:
            continue
        if row[0] == '' or ('計' in row[0]):
            continue
        if row[2] == '0':
            continue

        res.append({
            'companyName': row[0],
            'length': row[2],
        })

    f = open('./output.json', mode='w')
    json.dump(res, f, ensure_ascii=False)
