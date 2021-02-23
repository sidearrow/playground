import json
import traceback
from typing import List
from src.actions.base_action import BaseAction
from src.app_logger import get_logger
from src.local_db import LocalDB

logger = get_logger(__name__)


class UpdateLocalDBAction(BaseAction):
    def __init__(self, local_db: LocalDB, site_id_list: List[str]) -> None:
        self.__local_db = local_db
        self.__site_id_list = site_id_list
        super().__init__()

    def exec(self):
        logger.info("start updated local db action")
        for site_id in self.__site_id_list:
            try:
                filepath = "/tmp/download_rss/{}.json".format(site_id)
                with open(filepath) as f:
                    data = json.load(f)
                self.__local_db.update_and_remove_old(site_id, data)
                self._success_site_ids.append(site_id)
            except Exception as e:
                logger.warning("fail to update local db: {}".format(site_id))
                logger.warning(traceback.format_exc())
                self._fail_site_ids.append(site_id)
                continue
            else:
                self._success_site_ids.append(site_id)
        logger.info("finish updated local db action")
        logger.info("fail site ids: {}".format(self._fail_site_ids))