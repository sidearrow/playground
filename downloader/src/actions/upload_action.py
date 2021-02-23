from concurrent.futures import ThreadPoolExecutor, as_completed
import traceback
from typing import List

from src.actions.base_action import BaseAction
from src.app_logger import get_logger
from src.local_db import LocalDB
from src.s3 import S3Client


logger = get_logger(__name__)


class UploadAction(BaseAction):
    def __init__(
        self, local_db: LocalDB, s3_client: S3Client, site_id_list: List[str]
    ) -> None:
        super().__init__()
        self.__local_db = local_db
        self.__s3_client = s3_client
        self.__site_id_list = site_id_list

    def exec(self):
        logger.info("start upload action")
        futures = []
        with ThreadPoolExecutor(max_workers=4) as executor:
            for site_id in self.__site_id_list:
                future = executor.submit(self.__upload, site_id)
                futures.append(future)
            future = executor.submit(self.__upload_latest)
            futures.append(future)
        as_completed(futures)
        logger.info("finish upload action")
        logger.info("fail site ids: {}".format(self._fail_site_ids))

    def __upload(self, site_id: str):
        try:
            entries = self.__local_db.get_entries(site_id)
            data = {"entries": entries}
            self.__s3_client.put_entries(site_id, data)
        except Exception:
            self._fail_site_ids.append(site_id)
            logger.warning("fail to upload: {}".format(site_id))
            logger.warning(traceback.format_exc())
        else:
            self._success_site_ids.append(site_id)

    def __upload_latest(self):
        site_id = "_latest"
        try:
            data = self.__local_db.get_entries_all()
            self.__s3_client.put_entries(site_id, data)
        except Exception:
            self._fail_site_ids.append(site_id)
            logger.warning("fail to upload: {}".format(site_id))
            logger.warning(traceback.format_exc())
        else:
            self._success_site_ids.append(site_id)
