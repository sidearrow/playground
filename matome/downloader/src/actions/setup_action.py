import csv
from io import StringIO
from typing import List
from src.app_logger import get_logger
from src.s3 import S3Client
from src.local_db import LocalDB

logger = get_logger(__name__)


class SetupActionLocalDB(LocalDB):
    def init_sites_table(self, data):
        cur = self._con.cursor()
        sql = "drop table if exists sites"
        cur.execute(sql)
        sql = """
        create table sites (
            category_id text,
            site_id text,
            site_name text,
            site_url text,
            rss_url text,
            primary key (site_id)
        )
        """
        cur.execute(sql)
        sql = "insert into sites values (?, ?, ?, ?, ?)"
        cur.executemany(sql, data)
        self._con.commit()

    def get_sites(self):
        sql = "select * from sites"
        cur = self._con.cursor()
        cur.execute(sql)
        res = cur.fetchall()
        return [dict(r) for r in res]


class SetupAction:
    def __init__(self, s3_client: S3Client) -> None:
        self.__s3_client = s3_client
        self.__sites = []

    @property
    def loaded_sites(self):
        return self.__sites

    def exec(self):
        sites_csv = self.__s3_client.get_sites_csv()
        sites = self.__load_sites_csv(sites_csv)
        self.__s3_client.download_local_db("/tmp/local.db")
        local_db = SetupActionLocalDB("/tmp/local.db")
        local_db.init_sites_table(sites)
        self.__sites = local_db.get_sites()

    @staticmethod
    def __load_sites_csv(sites_csv) -> List[list]:
        csvr = csv.reader(StringIO(sites_csv))
        res = [r for r in csvr]
        return res