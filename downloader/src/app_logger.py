from logging import getLogger, StreamHandler, DEBUG


def get_logger(name: str):
    logger = getLogger(name)
    handler = StreamHandler()
    handler.setLevel(DEBUG)
    logger.setLevel(DEBUG)
    logger.addHandler(handler)
    return logger