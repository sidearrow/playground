from logging import getLogger, StreamHandler, DEBUG
from src.app_config import Config


def get_logger(name: str):
    logger = getLogger(name)
    logger.setLevel(DEBUG)
    if Config.ENV == "DEVELOPMENT":
        handler = StreamHandler()
        handler.setLevel(DEBUG)
        logger.addHandler(handler)
    return logger