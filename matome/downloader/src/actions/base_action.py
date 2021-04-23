class BaseAction:
    def __init__(self) -> None:
        self._success_site_ids = []
        self._fail_site_ids = []

    @property
    def success_site_ids(self):
        return self._success_site_ids

    @property
    def fail_site_ids(self):
        return self._fail_site_ids