from src.upload_action import UploadAction
import traceback
from typing import List

from src.app_logger import get_logger
from src.download_site import get_download_list
from src.s3 import S3Client
from src.download_rss_action import DownloadRSSAction

logger = get_logger(__name__)


def main(site_ids: List[str]):
    s3_client = S3Client()

    try:
        download_list = get_download_list(s3_client)
        s3_client.download_entries_db("/tmp/db.db")
    except Exception as e:
        logger.error("fail to get download pre data")
        logger.error(traceback.format_exc())
        return

    if len(site_ids) > 0:
        download_list = [v for v in download_list if v.site_id in site_ids]

    download_rss_action = DownloadRSSAction(download_list)
    download_rss_result = download_rss_action.exec()

    success_site_id_list = download_rss_result["success_site_id_list"]

    upload_action = UploadAction(s3_client, success_site_id_list)
    upload_action.exec()

    try:
        s3_client.upload_entries_db("/tmp/db.db")
    except Exception as e:
        logger.error("fail to uploda db")
        logger.error(traceback.format_exc())
        return

    logger.info("success")


def lambda_handler(event, context):
    site_ids = event.get("site_ids", [])
    main(site_ids)


if __name__ == "__main__":
    lambda_handler({}, {})