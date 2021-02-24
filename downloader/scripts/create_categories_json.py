import csv
import json

res = []
with open("./master/_.csv") as f:
    csvr = csv.reader(f)
    for row in csvr:
        data = {
            "categoryId": row[0],
            "categoryName": row[2],
        }
        res.append(data)

with open("./categories.json", "w") as f:
    json.dump(res, f, ensure_ascii=False)