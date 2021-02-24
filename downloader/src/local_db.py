from sqlite3 import connect, Row


class LocalDB:
    def __init__(self, db: str) -> None:
        con = connect(db, check_same_thread=False)
        con.row_factory = Row
        self._con = con

    def create_entries_table(self):
        sql = """
        create table entries (
            site_id text,
            url text,
            title text,
            updated text,
            primary key (site_id, url)
        )
        """
        self._con.execute(sql)
