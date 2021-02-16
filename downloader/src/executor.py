import json
from typing import List
import traceback
import feedparser
from urllib import request, parse
from base64 import b64encode

from src.s3 import S3Client
from src.app_config import AppConfig
from src.app_logger import get_logger

logger = get_logger(__name__)


def get_download_list(s3_client: S3Client, config_bucket: str) -> List[str]:
    data = s3_client.get(config_bucket, "download_list.json")
    return json.loads(data)


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
    s3key = "_/" + id
    s3_client.put(bucket, s3key, data)


def get_sites(s3_client: S3Client, bucket: str) -> dict:
    res = s3_client.get(bucket, "sites")
    res = json.loads(res)
    res = {v["id"]: v for v in res}
    return res


def put_sites(s3_client: S3Client, bucket: str, data: str):
    s3_client.put(bucket, "sites", data)


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
    for rss_url in download_list:
        id = parse.quote(b64encode(rss_url.encode()).decode("utf-8"))
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
    app_config = AppConfig(event.get("env"))
    main(app_config)


lambda_handler({}, {})