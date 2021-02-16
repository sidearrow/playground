from datetime import datetime
import feedparser
import json
import traceback
from urllib.request import Request, urlopen
from base64 import b64encode

from src.s3 import S3Client
from src.app_logger import get_logger


class Downloader:
    def __init__(
        self,
        rss_url: str,
    ) -> None:
        self.__logger = get_logger(__name__)
        self.__rss_url = rss_url
        self.__id = b64encode(rss_url).decode("utf-8")
        self.__s3key = "latest/{}.json".format(self.__id)

        self.__site_title = None
        self.__site_url = None

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
        req = Request(self.__rss_url)
        res = None
        with urlopen(req) as r:
            res = r.read()
        fpd = feedparser.parse(res)
        self.__site_title = fpd["feed"]["title"]
        self.__site_url = fpd["feed"]["link"]
        entries = []
        for entry in fpd["entries"]:
            d = {
                "url": entry["id"],
                "title": entry["title"],
                "updated": entry["updated"],
            }
            entries.append(d)
        return entries
