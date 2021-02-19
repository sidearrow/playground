import csv
import json

csv_r = csv.reader(open("./download_list.csv"))

res = []
for row in csv_r:
    site_id = row[0]
    site_name = row[1]
    site_url = row[2]
    d = {"siteId": site_id, "siteName": site_name, "siteUrl": site_url}
    res.append(d)
res.sort(key=lambda v: v["siteName"])

json.dump(res, open("sites.json", "w"), ensure_ascii=False)