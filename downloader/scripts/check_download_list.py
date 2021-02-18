import csv
import feedparser
from urllib import request

csv_r = csv.reader(open("./download_list.csv"))
csv_w = csv.writer(open("./download_list.fix.csv", "w"))

data = [v for v in csv_r]

for row in csv_r:
    site_id = row[0]
    title = row[1]
    link = row[2]
    rss_url = row[3]

    try:
        res = request.urlopen(rss_url)
        fp = feedparser.parse(res.read())

        title = fp["feed"]["title"]
        link = fp["feed"]["link"]
    except:
        print(site_id)

    csv_w.writerow([site_id, title, link, rss_url])