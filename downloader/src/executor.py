import csv
from src.rss import download_rss
import json
import traceback
from dataclasses import dataclass
from io import StringIO
from typing import List

from src.s3 import S3Client
from src.app_config import AppConfig
from src.app_logger import get_logger

logger = get_logger(__name__)


@dataclass
class DownloadSite:
    site_id: str
    site_name: str
    site_url: str
    rss_url: str


def get_download_list(s3_client: S3Client, config_bucket: str) -> List[DownloadSite]:
    csvstr = s3_client.get(config_bucket, "download_list.csv")
    csvr = csv.reader(StringIO(csvstr))
    res = []
    for row in csvr:
        ds = DownloadSite(
            site_id=row[0], site_name=row[1], site_url=row[2], rss_url=row[3]
        )
        res.append(ds)
    return res


def put_entries(s3_client: S3Client, bucket: str, id: str, data: str):
    s3key = "latest/_/" + id
    s3_client.put(bucket, s3key, data)


def get_entries(s3_client: S3Client, bucket: str, id: str):
    s3key = "latest/_/" + id
    res = s3_client.get(bucket, s3key)
    return json.loads(res)


def put_sites(s3_client: S3Client, bucket: str, data: str):
    s3_client.put(bucket, "latest/sites", data)


def main(app_config: AppConfig):
    s3_client = S3Client(endpoint_url=app_config.s3_endpoint_url)
    content_bucket = app_config.s3_content_bucket

    try:
        download_list = get_download_list(s3_client, app_config.s3_config_bucket)
    except Exception as e:
        logger.error("fail to get download list")
        logger.debug(traceback.format_exc())
        return

    sites = []
    for ds in download_list:
        site_id = ds.site_id
        rss_url = ds.rss_url

        entries = []
        try:
            entries = download_rss(rss_url)
        except Exception as e:
            logger.warning("fail to download rss: {}".format(rss_url))
            logger.debug(traceback.format_exc())

        entry_num = len(entries)
        if entry_num == 0:
            continue

        m_site = {
            "siteId": ds.site_id,
            "siteName": ds.site_name,
            "siteUrl": ds.site_url,
            "entryNum": entry_num,
        }
        m_entries = {"site": m_site, "entries": entries}
        entries_json = json.dumps(m_entries, ensure_ascii=False)
        try:
            put_entries(s3_client, app_config.s3_content_bucket, site_id, entries_json)
        except Exception as e:
            logger.debug(traceback.format_exc())

        sites.append(m_site)
        break

    try:
        m_sites = {"sites": sites}
        sites = json.dumps(m_sites, ensure_ascii=False)
        put_sites(s3_client, content_bucket, sites)
    except Exception as e:
        logger.warning("fail to put sites")
        logger.debug(traceback.format_exc())

    logger.info("done")


def lambda_handler(event, context):
    app_config = AppConfig()
    main(app_config)


if __name__ == "__main__":
    lambda_handler({}, {})