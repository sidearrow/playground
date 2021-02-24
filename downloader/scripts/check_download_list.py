import csv
import feedparser
import traceback
from urllib import request
from collections import Counter
from uuid import uuid4

out = []
with open("./master/pazudora.csv") as f:
    csv_r = csv.reader(f)
    for row in csv_r:
        site_id = row[0]
        title = row[1]
        link = row[2]
        rss_url = row[3]

        try:
            if site_id == "" or title == "" or link == "":
                site_id = uuid4()
                print(rss_url)
                req = request.Request(rss_url)
                req.add_header("User-Agent", "Mozilla/5.0")
                with request.urlopen(req) as res:
                    fp = feedparser.parse(res.read())
                    title = fp["feed"]["title"]
                    link = fp["feed"]["link"]
        except Exception as e:
            print(traceback.format_exc())

        out.append([site_id, title, link, rss_url])

title_list = [v[1] for v in out]
dup_title = [k for k, v in Counter(title_list).items() if v > 1]
print(dup_title)
out.sort(key=lambda v: v[1])


csv_w = csv.writer(open("./master/pazudora.fix.csv", "w"))
csv_w.writerows(out)