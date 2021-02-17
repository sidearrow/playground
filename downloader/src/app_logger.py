from logging import getLogger, StreamHandler, DEBUG
import os


def get_logger(name: str):
    logger = getLogger(name)
    logger.setLevel(DEBUG)
    if os.environ.get("ENV") == "DEVELOPMENT":
        handler = StreamHandler()
        handler.setLevel(DEBUG)
        logger.addHandler(handler)
    return logger