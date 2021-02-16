import os

try:
    from dotenv import load_dotenv

    load_dotenv(os.path.join(os.path.dirname(__file__), "../.env"))
except:
    pass


class AppConfig:
    def __init__(self) -> None:
        self.s3_endpoint_url = os.environ.get("S3_ENDPOINT_URL")
        self.s3_content_bucket = os.environ.get("S3_CONTENT_BUCKET")
        self.s3_config_bucket = os.environ.get("S3_CONFIG_BUCKET")