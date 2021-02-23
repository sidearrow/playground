import csv
from io import StringIO
import traceback
from typing import List
from src.app_logger import get_logger
from src.s3 import S3Client
from src.local_db import LocalDB

logger = get_logger(__name__)


class SetupAction:
    def __init__(self, s3_client: S3Client) -> None:
        self.__s3_client = s3_client
        self.__sites = []

    @property
    def loaded_sites(self):
        return self.__sites

    def exec(self):
        sites_csv = self.__s3_client.get_sites_csv()
        sites_dict = self.__sites_csv_to_dict(sites_csv)
        self.__s3_client.download_local_db("/tmp/local.db")
        local_db = LocalDB("/tmp/local.db")
        try:
            local_db.create_sites_table()
        except Exception:
            logger.warning(traceback.format_exc())
        local_db.upsert_sites(sites_dict)
        self.__sites = local_db.get_sites()

    @staticmethod
    def __sites_csv_to_dict(sites_csv) -> List[dict]:
        csvr = csv.reader(StringIO(sites_csv))
        res = []
        for row in csvr:
            ds = {
                "site_id": row[0],
                "site_name": row[1],
                "site_url": row[2],
                "rss_url": row[3],
            }
            res.append(ds)
        return res