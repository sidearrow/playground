import feedparser
from urllib import request


def download_rss(rss_url):
    res = None
    with request.urlopen(rss_url) as r:
        res = r.read()
    fpd = feedparser.parse(res)
    entries = []
    for entry in fpd["entries"]:
        d = {
            "url": entry["id"],
            "title": entry["title"],
            "updated": entry["updated"],
        }
        entries.append(d)
    return entries