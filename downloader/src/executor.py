import csv
import traceback
from dataclasses import dataclass
from io import StringIO
from typing import List

from src.app_logger import get_logger
from src.downloader import Downloader
from src.s3 import S3Client

logger = get_logger(__name__)


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


def main():
    s3_client = S3Client()

    try:
        download_list = get_download_list(s3_client)
    except Exception as e:
        logger.error("fail to get download list")
        logger.debug(traceback.format_exc())
        return

    for ds in download_list:
        downloader = Downloader(s3_client, ds)
        downloader.exec()


def lambda_handler(event, context):
    main()


if __name__ == "__main__":
    lambda_handler({}, {})