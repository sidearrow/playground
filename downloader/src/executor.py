import traceback
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List

from src.app_logger import get_logger
from src.downloader import Downloader
from src.download_site import get_download_list
from src.s3 import S3Client

logger = get_logger(__name__)


def main(site_ids: List[str]):
    s3_client = S3Client()

    try:
        download_list = get_download_list(s3_client)
    except Exception as e:
        logger.error("fail to get download list")
        logger.debug(traceback.format_exc())
        return

    if len(site_ids) > 0:
        download_list = [v for v in download_list if v.site_id in site_ids]

    futures = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        for ds in download_list:
            downloader = Downloader(s3_client, ds)
            future = executor.submit(downloader.exec)
            futures.append(future)
        _ = as_completed(fs=futures)

    logger.info("success")


def lambda_handler(event, context):
    site_ids = event.get("site_ids", [])
    main(site_ids)


if __name__ == "__main__":
    lambda_handler({"site_ids": ["gurum", "oryouri", "dummy"]}, {})