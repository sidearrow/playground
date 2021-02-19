import traceback
from concurrent.futures import ThreadPoolExecutor, as_completed

from src.app_logger import get_logger
from src.downloader import Downloader
from src.download_site import get_download_list
from src.s3 import S3Client

logger = get_logger(__name__)


def main():
    s3_client = S3Client()

    try:
        download_list = get_download_list(s3_client)
    except Exception as e:
        logger.error("fail to get download list")
        logger.debug(traceback.format_exc())
        return

    futures = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        for ds in download_list:
            downloader = Downloader(s3_client, ds)
            future = executor.submit(fn=downloader.exec)
            futures.append(future)
        _ = as_completed(fs=futures)

    logger.info("success")


def lambda_handler(event, context):
    main()


if __name__ == "__main__":
    lambda_handler({}, {})