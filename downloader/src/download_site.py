import csv
from dataclasses import dataclass
from io import StringIO
from typing import List

from src.s3 import S3Client


@dataclass
class DownloadSite:
    site_id: str
    site_name: str
    site_url: str
    rss_url: str


def get_download_list(s3_client: S3Client) -> List[DownloadSite]:
    csvstr = s3_client.get_download_list()
    csvr = csv.reader(StringIO(csvstr))
    res = []
    for row in csvr:
        ds = DownloadSite(
            site_id=row[0], site_name=row[1], site_url=row[2], rss_url=row[3]
        )
        res.append(ds)
    return res