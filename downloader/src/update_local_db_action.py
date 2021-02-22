import json
import traceback
from typing import List
from src.app_logger import get_logger
from src.local_db import LocalDB

logger = get_logger(__name__)


class UpdateLocalDBAction:
    def __init__(self, local_db: LocalDB, site_id_list: List[str]) -> None:
        self.__local_db = local_db
        self.__site_id_list = site_id_list
        self.__result = {
            "success_site_id_list": [],
            "fail_site_id_list": [],
        }

    def exec(self):
        for site_id in self.__site_id_list:
            try:
                filepath = "/tmp/download_rss/{}.json".format(site_id)
                with open(filepath) as f:
                    data = json.load(f)
                upsert_data = [
                    [site_id, v["url"], v["title"], v["updated"]] for v in data
                ]
                self.__local_db.upsert_many(upsert_data)
                entries = self.__local_db.get_entries(site_id)
                oldest_updated = entries[-1]["updated"]
                self.__local_db.delete_old_entries(site_id, oldest_updated)
                self.__result["success_site_id_list"].append(site_id)
            except Exception as e:
                logger.warning("fail to update local db: {}".format(site_id))
                logger.warning(traceback.format_exc())
                self.__result["fail_site_id_list"].append(site_id)
                continue
        return self.__result