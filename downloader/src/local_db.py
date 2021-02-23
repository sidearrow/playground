from sqlite3 import connect, Row


class LocalDB:
    def __init__(self, db: str) -> None:
        con = connect(db, check_same_thread=False)
        con.row_factory = Row
        self.__con = con

    def close(self):
        self.__con.close()

    def create_sites_table(self):
        sql = """
        create table sites (
            site_id text,
            site_name text,
            site_url text,
            rss_url text,
            primary key (site_id)
        )
        """
        self.__con.execute(sql)

    def upsert_sites(self, data):
        sql = """
        insert or replace into sites (
            site_id, site_name, site_url, rss_url
        ) values (
            ?, ?, ?, ?
        )
        """
        data = [
            [v["site_id"], v["site_name"], v["site_url"], v["rss_url"]] for v in data
        ]
        cur = self.__con.cursor()
        cur.executemany(sql, data)
        self.__con.commit()

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
        self.__con.execute(sql)

    def get_sites(self):
        sql = "select * from sites"
        cur = self.__con.cursor()
        cur.execute(sql)
        res = cur.fetchall()
        return [dict(r) for r in res]

    def get_entries(self, site_id: str):
        sql = """
        select title, url, updated
        from entries
        where site_id = ?
        order by updated desc
        limit 100
        """
        cur = self.__con.cursor()
        cur.execute(sql, (site_id,))
        res = cur.fetchall()
        return [dict(r) for r in res]

    def get_entries_all(self):
        sql = """
        select s.site_id, s.site_name, s.site_url, e.title, e.url, e.updated
        from entries e
        left join sites s on s.site_id = e.site_id
        order by s.updated desc
        limit 100
        """
        cur = self.__con.cursor()
        cur.execute(sql)
        res = cur.fetchall()
        return [dict(r) for r in res]

    def update_and_remove_old(self, site_id, data, num=100):
        upsert_sql = """
        insert or replace into entries (
            site_id, url, title, updated
        ) values (
            ?, ?, ?, ?
        )
        """
        delete_sql = """
        delete from entries
        where updated <= (
            select updated from entries e
            where site_id = ?
            order by e.updated desc
            limit 1 offset ?
        ) and site_id = ?
        """
        upsert_data = [[site_id, v["url"], v["title"], v["updated"]] for v in data]
        cur = self.__con.cursor()
        try:
            cur.executemany(upsert_sql, upsert_data)
            cur.execute(delete_sql, (site_id, num, site_id))
        except Exception as e:
            self.__con.rollback()
            raise e
        finally:
            self.__con.commit()
