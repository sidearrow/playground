import csv
import json

res = []
with open("./master/_.csv") as f:
    csvr = csv.reader(f)
    for row in csvr:
        data = {
            "siteId": row[0],
            "siteName": row[2],
        }
        res.append(data)

with open("./category.json", "w") as f:
    json.dump(res, f, ensure_ascii=False)