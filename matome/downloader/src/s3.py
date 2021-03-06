import boto3
import json

from src.app_config import Config
from src.app_logger import get_logger

logger = get_logger(__name__)


class S3Client:
    def __init__(self) -> None:
        if Config.S3_ENDPOINT_URL is None:
            self.__client = boto3.client("s3")
        else:
            self.__client = boto3.client("s3", endpoint_url=Config.S3_ENDPOINT_URL)

    def put_entries(self, site_id: str, data: dict):
        data = json.dumps(data, ensure_ascii=False)
        key = "latest/_/{}.json".format(site_id)
        bucket = Config.S3_PUBLIC_BUCKET
        logger.info("Upload s3 object: s3://{}/{}".format(bucket, key))
        self.__client.put_object(
            Bucket=bucket,
            Key=key,
            Body=data,
            ContentType="application/json",
            CacheControl="max-age=3600",
        )

    def get_sites_csv(self):
        return self.get(Config.S3_PRIVATE_BUCKET, "sites.csv")

    def download_local_db(self, local_path: str):
        self.__client.download_file(Config.S3_PRIVATE_BUCKET, "local.db", local_path)

    def upload_local_db(self, local_path: str):
        self.__client.upload_file(local_path, Config.S3_PRIVATE_BUCKET, "local.db")

    def get(self, bucket: str, key: str) -> str:
        logger.info("Get s3 object: s3://{}/{}".format(bucket, key))
        obj = self.__client.get_object(Bucket=bucket, Key=key)
        res = obj["Body"].read().decode("utf-8")
        return res
