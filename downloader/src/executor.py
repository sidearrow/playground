import traceback
from typing import List

from src.app_logger import get_logger
from src.local_db import LocalDB
from src.s3 import S3Client
from src.actions.setup_action import SetupAction
from src.actions.download_rss_action import DownloadRSSAction
from src.actions.update_local_db_action import UpdateLocalDBAction
from src.actions.upload_action import UploadAction

logger = get_logger(__name__)


def main(site_ids: List[str]):
    s3_client = S3Client()

    target_sites = []
    try:
        setup_action = SetupAction(s3_client)
        setup_action.exec()
        target_sites = setup_action.loaded_sites
    except Exception:
        logger.error("fail to setup action")
        logger.error(traceback.format_exc())
        return

    if len(site_ids) > 0:
        target_sites = [v for v in target_sites if v["site_id"] in site_ids]

    download_rss_action = DownloadRSSAction(target_sites)
    download_rss_action.exec()
    success_site_ids = download_rss_action.success_site_ids

    local_db = LocalDB("/tmp/local.db")
    update_local_db_action = UpdateLocalDBAction(local_db, success_site_ids)
    update_local_db_action.exec()
    success_site_ids = update_local_db_action.success_site_ids

    upload_action = UploadAction(local_db, s3_client, success_site_ids)
    upload_action.exec()

    try:
        s3_client.upload_local_db("/tmp/local.db")
    except Exception as e:
        logger.error("fail to uploda local db")
        logger.error(traceback.format_exc())
        return

    logger.info("success")


def lambda_handler(event, context):
    site_ids = event.get("site_ids", [])
    main(site_ids)


if __name__ == "__main__":
    lambda_handler({}, {})