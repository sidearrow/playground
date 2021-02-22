from datetime import timezone, timedelta
from datetime import datetime
from email.utils import parsedate_to_datetime


def format_datetime(s: str) -> str:
    try:
        d = datetime.fromisoformat(s)
    except Exception:
        pass
    try:
        d = parsedate_to_datetime(s)
    except Exception:
        pass

    d = d.astimezone(timezone(timedelta(hours=9)))
    return d.isoformat()