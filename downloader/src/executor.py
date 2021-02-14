import json
from src.download_list import DownloadList, DownloadListManager
import traceback
from datetime import datetime
from src.s3 import S3Client

from src.app_config import AppConfig
from src.app_logger import get_logger
from src.downloader import Downloader

logger = get_logger(__name__)


def get_download_list(s3_client: S3Client, config_bucket: str) -> list:
    data = s3_client.get(config_bucket, "download_list.json")
    return json.loads(data)


def create_execute_id() -> str:
    return datetime.now().strftime("%Y%m%d%H%M%S")


def main(app_config: AppConfig):
    s3_client = S3Client(endpoint_url=app_config.s3_endpoint_url)
    execute_id = create_execute_id()

    try:
        download_list: DownloadList = DownloadListManager.init(
            s3_client, app_config.s3_config_bucket
        )
    except Exception as e:
        logger.info("fail to get download list")
        logger.debug(traceback.format_exc())
        return

    for v in download_list.sites:
        downloader = Downloader(
            execute_id=execute_id,
            s3_client=s3_client,
            content_bucket=app_config.s3_content_bucket,
            download_list_site=v,
        )
        downloader.exec()
    logger.info("DONE")


def lambda_handler(event, context):
    app_config = AppConfig(event.get("env"))
    main(app_config)


lambda_handler({}, {})