import feedparser
import json
import os
import shutil
import traceback
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List
from urllib.request import Request, urlopen

from src.actions.base_action import BaseAction
from src.app_logger import get_logger
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


class DownloadRSSAction(BaseAction):
    DIR = "/tmp/download_rss"

    def __init__(self, sites: List[dict]) -> None:
        super().__init__()
        self.__sites = sites
        try:
            shutil.rmtree(self.DIR)
        except Exception:
            pass
        os.makedirs(self.DIR)

    def exec(self):
        logger.info("download rss action start")
        futures = []
        with ThreadPoolExecutor(max_workers=16) as executor:
            for v in self.__sites:
                future = executor.submit(self.__main, v["site_id"], v["rss_url"])
                futures.append(future)
        as_completed(futures)
        logger.info("download rss action success")
        logger.info("fail site ids: {}".format(self._fail_site_ids))

    def __main(self, site_id: str, rss_url: str):
        entries = []
        try:
            entries = get_rss(rss_url)
            if len(entries) == 0:
                raise Exception("entries is empty")
            filepath = os.path.join(self.DIR, "{}.json".format(site_id))
            with open(filepath, "w") as f:
                json.dump(entries, f, ensure_ascii=False)
        except Exception:
            self._fail_site_ids.append(site_id)
            logger.warning("fail to download rss site_id: {}".format(site_id))
            logger.warning(traceback.format_exc())
            return
        else:
            logger.warning("success to download rss site_id: {}".format(site_id))
            self._success_site_ids.append(site_id)