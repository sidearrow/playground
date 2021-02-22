from src.db import DB
import feedparser
import traceback
from urllib.request import Request, urlopen

from src.app_logger import getLogger
from src.download_site import DownloadSite
from src.s3 import S3Client

logger = getLogger(__file__)


def get_rss(rss_url):
    res = None
    req = Request(rss_url)
    req.add_header("User-Agent", "Mozilla/5.0")
    with urlopen(req) as r:
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
        self,
        s3_client: S3Client,
        download_site: DownloadSite,
        db: DB,
    ) -> None:
        self.__s3_client = s3_client
        self.__download_list = download_site
        self.__db = db

    def exec(self):
        site_id = self.__download_list.site_id
        try:
            new_entries = []
            try:
                new_entries = get_rss(self.__download_list.rss_url)
            except Exception as e:
                logger.warning("fail to get rss")
                raise e
            if len(new_entries) == 0:
                logger.warning("entries in rss is emprty")
                return

            try:
                upsert_entries = [
                    [site_id, v["url"], v["title"], v["updated"]] for v in new_entries
                ]
                self.__db.upsert_many(upsert_entries)
            except Exception as e:
                print(traceback.format_exc())
                logger.warning("fail to update db")
                raise e

            try:
                entries = self.__db.get_entries(site_id)
                data = {"entries": entries}
                self.__s3_client.put_entries(self.__download_list.site_id, data)
                oldest_updates = entries[-1]["updated"]
                self.__db.delete_old_entries(site_id, oldest_updates)
            except Exception as e:
                logger.debug(traceback.format_exc())
                logger.warning("fail to upload entries")

        except Exception as e:
            logger.debug(traceback.format_exc())