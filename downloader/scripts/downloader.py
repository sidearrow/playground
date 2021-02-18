import csv
import json
import logging
import traceback
import feedparser
import os
from datetime import datetime
from dotenv import load_dotenv
from urllib import request
from typing import List

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

DOWNLOAD_LIST_FILE = os.environ["DOWNLOAD_LIST_FILE"]
OUTPUT_DIR = os.environ["OUTPUT_DIR"]
LOG_DIR = os.environ["LOG_DIR"]


def get_formated_datetime() -> str:
    return datetime.now().strftime("%Y%m%d%H%M%S")


log_file_path = os.path.join(LOG_DIR, "{}.log".format(get_formated_datetime()))
logger = logging.getLogger(__file__)
logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
handler.setLevel(logging.DEBUG)
logger.addHandler(handler)
handler = logging.FileHandler(log_file_path)
handler.setLevel(logging.DEBUG)
logger.addHandler(handler)


class DownloadSite:
    def __init__(self, site_id, site_name, site_url, rss_url) -> None:
        self.site_id = site_id
        self.site_name = site_name
        self.site_url = site_url
        self.rss_url = rss_url


def get_download_list() -> List[DownloadSite]:
    res = []
    csv_r = csv.reader(open(DOWNLOAD_LIST_FILE))
    for row in csv_r:
        ds = DownloadSite(
            site_id=row[0],
            site_name=row[1],
            site_url=row[2],
            rss_url=row[3],
        )
        res.append(ds)
    return res


def donwload_rss(rss_url: str):
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


def put_entries(site_id: str, data: str):
    filepath = os.path.join(OUTPUT_DIR, "_", "{}.json".format(site_id))
    open(filepath, "w").write(data)


def put_sites(data: str):
    filepath = os.path.join(OUTPUT_DIR, "sites.json")
    open(filepath, "w").write(data)


def main():
    sites = []
    download_list = get_download_list()
    for ds in download_list:
        site_id = ds.site_id
        rss_url = ds.rss_url
        site = {
            "siteId": ds.site_id,
            "siteName": ds.site_name,
            "siteUrl": ds.site_url,
        }

        entries = []
        try:
            entries = donwload_rss(rss_url)
        except Exception as e:
            logger.warning("fail to download rss: {}".format(rss_url))
            logger.debug(traceback.format_exc())
            continue

        entries_res = {
            "site": site,
            "entries": entries,
        }
        entries_json = json.dumps(entries_res, ensure_ascii=False)
        try:
            put_entries(site_id, entries_json)
        except Exception as e:
            logger.debug(traceback.format_exc())

        site["entryNum"] = len(entries)
        sites.append(site)

    try:
        sites = json.dumps(sites, ensure_ascii=False)
        put_sites(sites)
    except Exception as e:
        logger.warning("fail to put sites")
        logger.debug(traceback.format_exc())

    logger.info("done")


if __name__ == "__main__":
    main()