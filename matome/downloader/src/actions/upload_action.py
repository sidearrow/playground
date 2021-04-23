import traceback
from concurrent.futures import ThreadPoolExecutor, as_completed

from src.actions.base_action import BaseAction
from src.app_logger import get_logger
from src.local_db import LocalDB
from src.s3 import S3Client


logger = get_logger(__name__)


class _LocalDB(LocalDB):
    def get_categories(self):
        cur = self._con.cursor()
        cur.execute("select distinct(category_id) as c from sites")
        res = cur.fetchall()
        res = [r["c"] for r in res]
        return res

    def get_entries(self, cat_id: str = None):
        params = ()
        where = ""
        if cat_id is not None:
            where = "where s.category_id = ?"
            params = (cat_id,)
        sql = """
        select s.site_id, s.site_name, s.site_url, e.title, e.url, e.updated
        from entries e
        left join sites s on s.site_id = e.site_id
        {}
        order by e.updated desc
        limit 200
        """.format(
            where
        )
        cur = self._con.cursor()
        cur.execute(sql, params)
        rows = cur.fetchall()
        data = []
        for row in rows:
            r = {
                "site": {
                    "siteId": row["site_id"],
                    "siteName": row["site_name"],
                    "siteUrl": row["site_url"],
                },
                "entry": {
                    "title": row["title"],
                    "url": row["url"],
                    "updated": row["updated"],
                },
            }
            data.append(r)
        return data


class UploadAction(BaseAction):
    def __init__(self, s3_client: S3Client) -> None:
        super().__init__()
        self.__local_db = _LocalDB("/tmp/local.db")
        self.__s3_client = s3_client

    def exec(self):
        logger.info("start upload action")
        futures = []
        category_ids = self.__local_db.get_categories()
        category_ids.append("_all")
        with ThreadPoolExecutor(max_workers=4) as executor:
            for cat_id in category_ids:
                future = executor.submit(self.__upload, cat_id)
                futures.append(future)
        as_completed(futures)
        logger.info("finish upload action")
        logger.info("fail site ids: {}".format(self._fail_site_ids))

    def __upload(self, cat_id: str):
        try:
            data = self.__local_db.get_entries(None if cat_id == "_all" else cat_id)
            self.__s3_client.put_entries(cat_id, data)
        except Exception:
            self._fail_site_ids.append(cat_id)
            logger.warning("fail to upload: {}".format(cat_id))
            logger.warning(traceback.format_exc())
        else:
            self._success_site_ids.append(cat_id)