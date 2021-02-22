from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List
from src.db import DB
from src.s3 import S3Client


class UploadAction:
    def __init__(self, s3_client: S3Client, site_id_list: List[str]) -> None:
        self.__s3_client = s3_client
        self.__site_id_list = site_id_list

    def exec(self):
        futures = []
        with ThreadPoolExecutor(max_workers=16) as executor:
            for site_id in self.__site_id_list:
                future = executor.submit(self.__upload, site_id)
                futures.append(future)
        as_completed(futures)

    def __upload(self, site_id: str):
        db = DB("/tmp/db.db")
        entries = db.get_entries(site_id)
        data = {"entries": entries}
        self.__s3_client.put_entries(site_id, data)
