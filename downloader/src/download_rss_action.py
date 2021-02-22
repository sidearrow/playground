import feedparser
import json
import os
import shutil
import traceback
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List
from urllib.request import Request, urlopen

from src.app_logger import get_logger
from src.download_site import DownloadSite
from src.utils import format_datetime

logger = get_logger(__name__)


def get_rss(rss_url):
    res = None
    req = Request(rss_url)
    req.add_header("User-Agent", "Mozilla/5.0")
    with urlopen(req) as r:
        res = r.read()
    fpd = feedparser.parse(res)
    entries = []
    for entry in fpd["entries"]:
        updated = ""
        try:
            updated = format_datetime(entry["updated"])
        except Exception:
            pass
        d = {
            "url": entry["link"],
            "title": entry["title"],
            "updated": updated,
        }
        entries.append(d)
    return entries


class DownloadRSSAction:
    DIR = "/tmp/download_rss"

    def __init__(self, download_site: List[DownloadSite]) -> None:
        self.__download_list = download_site
        self.__result = {
            "success_site_id_list": [],
            "fail_site_id_list": [],
        }

        try:
            shutil.rmtree(self.DIR)
        except Exception:
            pass
        os.makedirs(self.DIR)

    def exec(self):
        futures = []
        with ThreadPoolExecutor(max_workers=16) as executor:
            for v in self.__download_list:
                future = executor.submit(self.__main, v.site_id, v.rss_url)
                futures.append(future)
        as_completed(futures)
        return self.__result

    def __add_success_site_id(self, site_id: str):
        self.__result["success_site_id_list"].append(site_id)

    def __add_fail_site_id(self, site_id: str):
        self.__result["fail_site_id_list"].append(site_id)

    def __main(self, site_id: str, rss_url: str):
        entries = []
        try:
            entries = get_rss(rss_url)
        except Exception as e:
            logger.warning("fail to download rss site_id: {}".format(site_id))
            logger.warning(traceback.format_exc())
            self.__add_fail_site_id(site_id)
        if len(entries) == 0:
            self.__add_fail_site_id(site_id)
            return
        try:
            filepath = os.path.join(self.DIR, "{}.json".format(site_id))
            with open(filepath, "w") as f:
                json.dump(entries, f, ensure_ascii=False)
        except Exception as e:
            logger.warning("fail to update entries site_id: {}".format(site_id))
            logger.warning(traceback.format_exc())
            self.__add_fail_site_id(site_id)
        logger.info("download rss action success: {}".format(site_id))
        self.__add_success_site_id(site_id)