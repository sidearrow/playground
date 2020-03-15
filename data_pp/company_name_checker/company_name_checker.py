import csv
import sys

sys.path.append('../')
import database

COMPANY_NAME_INDEX = 0

if __name__ == '__main__':
    f = open('./input.csv')
    csvReader = csv.reader(f)

    f = open('./output.csv', mode='w')
    csvWriter = csv.writer(f)

    new_company_list = []
    for row in csvReader:
        cur = database.getCursor()
        cur.execute('select count(*) cnt from company_name'
                    ' where company_name = %s', (row[COMPANY_NAME_INDEX]))
        cnt = cur.fetchone()['cnt']
        print(cnt)
        
        if cnt == 0:
            new_company_list.append(row[COMPANY_NAME_INDEX])
            csvWriter.writerow([row[COMPANY_NAME_INDEX]])
