from sqlite3 import connect, Row

CREATE_TABLE_SQL = """
create table entries (
    site_id text,
    url text,
    title text,
    updated text,
    primary key (site_id, url)
)
"""

SELECT_BY_SITE_ID_SQL = """
select title, url, updated
from entries
where site_id = ?
order by updated desc
limit 100
"""

DELETE_OLD_ENTRIES_SQL = """
delete from entries
where site_id = ? and updated < ?
"""

UPSERT_SQL = """
insert or replace into entries (
    site_id, url, title, updated
) values (
    ?, ?, ?, ?
)
"""


class DB:
    def __init__(self, db: str) -> None:
        con = connect(db)
        con.row_factory = Row
        self.__con = con

    def create_table(self):
        self.__con.execute(CREATE_TABLE_SQL)

    def get_entries(self, site_id: str):
        cur = self.__con.cursor()
        cur.execute(SELECT_BY_SITE_ID_SQL, (site_id,))
        res = cur.fetchall()
        return [dict(r) for r in res]

    def delete_old_entries(self, site_id: str, updated: str):
        cur = self.__con.cursor()
        cur.execute(
            DELETE_OLD_ENTRIES_SQL,
            (
                site_id,
                updated,
            ),
        )
        self.__con.commit()

    def upsert_many(self, data):
        cur = self.__con.cursor()
        cur.executemany(UPSERT_SQL, data)
        self.__con.commit()

    def close(self):
        self.__con.close()
