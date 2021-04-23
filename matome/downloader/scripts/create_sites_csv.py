import csv
import os

MASTER_DIR = "./master"
CATEGORY_FILE = "./master/_.csv"


def get_categories():
    res = []
    with open(CATEGORY_FILE) as f:
        csvr = csv.reader(f)
        for row in csvr:
            res.append({"id": row[0], "name": row[1]})
    return res


categories = get_categories()
categories.sort(key=lambda v: v["id"])

res = []
for category in categories:
    tmp = []
    category_id = category["id"]
    category_name = category["name"]
    filepath = os.path.join(MASTER_DIR, category_name + ".csv")
    with open(filepath) as f:
        csvr = csv.reader(f)
        for row in csvr:
            row = [category_id] + row
            tmp.append(row)
    tmp.sort(key=lambda v: v[1])
    res += tmp

with open("site.fix.csv", "w") as f:
    csvw = csv.writer(f)
    csvw.writerows(res)