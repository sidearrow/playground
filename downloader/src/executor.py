import csv
import feedparser
import json
import traceback
from dataclasses import dataclass
from io import StringIO
from typing import List
from urllib import request

from src.s3 import S3Client
from src.app_config import AppConfig
from src.app_logger import get_logger

logger = get_logger(__name__)


@dataclass
class DownloadSite:
    id: str
    rss_url: str


def get_download_list(s3_client: S3Client, config_bucket: str) -> List[DownloadSite]:
    csvstr = s3_client.get(config_bucket, "download_list.csv")
    csvr = csv.reader(StringIO(csvstr))
    res = []
    for row in csvr:
        ds = DownloadSite(id=row[0], rss_url=row[1])
        res.append(ds)
    return res


def donwload_rss(rss_url: str):
    req = request.Request(rss_url)
    res = None
    with request.urlopen(req) as r:
        res = r.read()

    fpd = feedparser.parse(res)
    title = fpd["feed"]["title"]
    url = fpd["feed"]["link"]

    entries = []
    for entry in fpd["entries"]:
        d = {
            "url": entry["id"],
            "title": entry["title"],
            "updated": entry["updated"],
        }
        entries.append(d)

    return {
        "title": title,
        "url": url,
        "entries": entries,
    }


def upload_data(s3_client: S3Client, bucket: str, id: str, data: str):
    s3key = "latest/_/" + id
    s3_client.put(bucket, s3key, data)


def get_sites(s3_client: S3Client, bucket: str) -> dict:
    res = s3_client.get(bucket, "latest/sites")
    res = json.loads(res)
    res = {v["id"]: v for v in res}
    return res


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

    prev_sites = {}
    try:
        prev_sites = get_sites(s3_client, content_bucket)
    except Exception as e:
        logger.warn("fail to get sites")
        logger.debug(traceback.format_exc())

    sites = []
    for ds in download_list:
        id = ds.id
        rss_url = ds.rss_url

        res = None
        try:
            res = donwload_rss(rss_url)
            res_json = json.dumps(res, ensure_ascii=False)
            upload_data(s3_client, app_config.s3_content_bucket, id, res_json)
        except Exception as e:
            logger.warning("fail to download rss: {}".format(rss_url))
            logger.debug(traceback.format_exc())
        if res is not None:
            site = {
                "id": id,
                "title": res["title"],
                "url": res["url"],
                "entry_num": len(res["entries"]),
            }
            sites.append(site)
        else:
            if id in prev_sites:
                sites.append(prev_sites[id])

    try:
        sites = json.dumps(sites, ensure_ascii=False)
        put_sites(s3_client, content_bucket, sites)
    except Exception as e:
        logger.warning("fail to put sites")
        logger.debug(traceback.format_exc())

    logger.info("done")


def lambda_handler(event, context):
    app_config = AppConfig()
    main(app_config)