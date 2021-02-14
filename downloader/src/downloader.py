from datetime import datetime
import feedparser
import json
import traceback
from urllib.request import Request, urlopen

from src.s3 import S3Client
from src.app_logger import get_logger
from src.download_list import DownloadListSite


class Downloader:
    def __init__(
        self,
        execute_id: str,
        s3_client: S3Client,
        content_bucket: str,
        download_list_site: DownloadListSite,
    ) -> None:
        self.__execute_id = execute_id
        self.__logger = get_logger(__name__)
        self.__s3_client = s3_client
        self.__site = download_list_site
        self.__content_bucket = content_bucket
        self.__s3key = "latest/{}.json".format(self.__site.site_id)

    def exec(self):
        res = None
        try:
            res = self.__download()
        except Exception as e:
            self.__logger.debug(traceback.format_exc())

        if res is None:
            try:
                res = self.__get_old_data()
            except Exception as e:
                self.__logger.debug(traceback.format_exc())
                return

        try:
            data = json.dumps(res, ensure_ascii=False)
            self.__s3_client.put(self.__content_bucket, self.__s3key, data)
        except Exception as e:
            self.__logger.debug(traceback.format_exc())

    def __get_old_data(self):
        res = self.__s3_client.get(self.__content_bucket, self.__s3key)
        res = json.loads(res)
        return res

    def __download(self):
        req = Request(self.__site.rss_url)
        res = None
        with urlopen(req) as r:
            res = r.read()
        fpd = feedparser.parse(res)
        entries = []
        for entry in fpd["entries"]:
            d = {
                "url": entry["id"],
                "title": entry["title"],
                "updated": entry["updated"],
                "updated_formated": datetime.fromisoformat(entry["updated"]).strftime(
                    "%Y/%m/%d %H:%M"
                ),
            }
            entries.append(d)
        return entries
