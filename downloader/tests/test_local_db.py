from unittest import TestCase
from src.local_db import LocalDB


class DBTest(TestCase):
    def test(self):
        local_db = LocalDB(":memory:")
        local_db.create_entries_table()
        local_db.create_sites_table()

        sites_data = [
            {
                "site_id": "test1",
                "site_name": "site_name_1",
                "site_url": "site_url_1",
                "rss_url": "rss_url_1",
            },
            {
                "site_id": "test2",
                "site_name": "site_name_2",
                "site_url": "site_url_2",
                "rss_url": "rss_url_2",
            },
        ]
        local_db.upsert_sites(sites_data)
        res = local_db.get_sites()
        self.assertListEqual(sites_data, res)

        site_id = "test1"
        data = [
            {"url": "url11", "title": "title1", "updated": "updated1"},
            {"url": "url12", "title": "title2", "updated": "updated2"},
        ]
        local_db.update_and_remove_old(site_id, data, 100)

        site_id = "test2"
        data = [
            {"url": "url21", "title": "title1", "updated": "updated1"},
            {"url": "url22", "title": "title2", "updated": "updated2"},
        ]
        local_db.update_and_remove_old(site_id, data, 100)

        expect_data = [
            {"url": "url12", "title": "title2", "updated": "updated2"},
            {"url": "url11", "title": "title1", "updated": "updated1"},
        ]
        entries = local_db.get_entries("test1")
        self.assertListEqual(expect_data, entries)

        site_id = "test1"
        data = [
            {"url": "url13", "title": "title1", "updated": "updated3"},
            {"url": "url14", "title": "title2", "updated": "updated4"},
        ]
        local_db.update_and_remove_old(site_id, data, 3)

        expect_data = [
            {"url": "url14", "title": "title2", "updated": "updated4"},
            {"url": "url13", "title": "title1", "updated": "updated3"},
            {"url": "url12", "title": "title2", "updated": "updated2"},
        ]
        entries = local_db.get_entries("test1")
        self.assertListEqual(expect_data, entries)
