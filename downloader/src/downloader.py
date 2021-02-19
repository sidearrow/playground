from src.executor import DownloadSite
import feedparser
import traceback
from urllib import request

from src.s3 import S3Client
from src.app_logger import getLogger

logger = getLogger(__file__)


def get_rss(rss_url):
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


class Downloader:
    def __init__(
        self, s3_client: S3Client, download_site: DownloadSite, max_entry_num: int = 100
    ) -> None:
        self.__s3_client = s3_client
        self.__download_list = download_site
        self.__max_entry_num = max_entry_num

    def exec(self):
        entries = []
        try:
            entries = get_rss(self.__download_list.rss_url)
        except Exception as e:
            logger.debug(traceback.format_exc())
            logger.warning("fail to get rss")
            return
        if len(entries) == 0:
            logger.warning("entries in rss is emprty")
            return

        old_entries = []
        try:
            old_data = self.__s3_client.get_entries(self.__download_list.site_id)
            old_entries = old_data["entries"]
        except Exception as e:
            logger.debug(traceback.format_exc())
            logger.warning("fail to get old entries")

        try:
            entries, update_num = self.__merge_entries(old_entries, entries)
            if update_num == 0:
                return
        except Exception as e:
            logger.debug(traceback.format_exc())
            logger.warning("fail to merge entries")

        entries = entries[: self.__max_entry_num]
        try:
            data = {
                "site": {
                    "siteId": self.__download_list.site_id,
                    "siteName": self.__download_list.site_name,
                    "siteUrl": self.__download_list.site_url,
                },
                "entries": entries,
            }
            self.__s3_client.put_entries(self.__download_list.site_id, data)
        except Exception as e:
            print(traceback.format_exc())
            logger.debug(traceback.format_exc())

    @staticmethod
    def __merge_entries(old, new):
        old_keys = [v["url"] for v in old]
        res = [*old]
        append_num = 0
        for v in new:
            if v["url"] not in old_keys:
                res.append(v)
                append_num += 1
        if append_num > 0:
            res.sort(key=lambda v: v["updated"], reverse=True)
        return res, append_num