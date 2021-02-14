import dacite
import json
from dataclasses import dataclass
from typing import List

from src.s3 import S3Client


@dataclass
class DownloadListSite:
    site_id: str
    site_name: str
    site_url: str
    rss_url: str


@dataclass
class DownloadList:
    sites: List[DownloadListSite]


class DownloadListManager:
    __download_list: DownloadList = None

    @classmethod
    def init(cls, s3_client: S3Client, bucket: str):
        if cls.__download_list is not None:
            raise Exception()
        data = s3_client.get(bucket, "download_list.json")
        data = json.loads(data)
        res = dacite.from_dict(data_class=DownloadList, data=data)
        return res

    @classmethod
    def get(cls):
        return cls.__download_list
