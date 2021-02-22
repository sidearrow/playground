from datetime import datetime
from email.utils import parsedate_to_datetime
from pytz import timezone


def format_datetime(s: str) -> str:
    try:
        d = datetime.fromisoformat(s)
    except Exception:
        pass
    try:
        d = parsedate_to_datetime(s)
    except Exception:
        pass

    d = d.astimezone(timezone("Asia/Tokyo"))
    return d.isoformat()