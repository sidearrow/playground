from concurrent.futures import ThreadPoolExecutor, as_completed
from src.app_logger import get_logger

logger = get_logger(__name__)


def main(i: int):
    logger.info("start: {}".format(i))


futures = []
with ThreadPoolExecutor(max_workers=8) as executor:
    logger.info("start")
    for i in range(10):
        future = executor.submit(main, i)
        futures.append(future)
    as_completed(futures)
logger.info("end")