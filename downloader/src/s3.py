import boto3

from src.app_logger import get_logger

logger = get_logger(__name__)


class S3Client:
    def __init__(self, endpoint_url: str = None) -> None:
        if endpoint_url is None:
            self.__client = boto3.client("s3")
        else:
            self.__client = boto3.client("s3", endpoint_url=endpoint_url)

    def put(self, bucket: str, key: str, data: str):
        logger.info("Upload s3 object: s3://{}/{}".format(bucket, key))
        self.__client.put_object(Bucket=bucket, Key=key, Body=data)

    def get(self, bucket: str, key: str) -> str:
        logger.info("Get s3 object: s3://{}/{}".format(bucket, key))
        obj = self.__client.get_object(Bucket=bucket, Key=key)
        res = obj["Body"].read().decode("utf-8")
        return res
