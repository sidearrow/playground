import os

try:
    from dotenv import load_dotenv

    load_dotenv(os.path.join(os.path.dirname(__file__), "../.env"))
except:
    pass


class Config:
    ENV = os.environ.get("ENV")
    S3_ENDPOINT_URL = os.environ.get("S3_ENDPOINT_URL")
    S3_PRIVATE_BUCKET = os.environ.get("S3_PRIVATE_BUCKET")
    S3_PUBLIC_BUCKET = os.environ.get("S3_PUBLIC_BUCKET")