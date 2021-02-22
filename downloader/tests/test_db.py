from unittest import TestCase
from src.db import DB


class DBTest(TestCase):
    def test(self):
        db = DB(":memory:")
        db.create_table()

        data = [
            ["site1", "url11", "title11", "11"],
            ["site1", "url12", "title12", "12"],
            ["site2", "url21", "title21", "21"],
        ]  # noqa
        db.upsert_many(data)

        res = db.get_entries("site1")
        expect_res = [
            {"url": "url12", "title": "title12", "updated": "12"},
            {"url": "url11", "title": "title11", "updated": "11"},
        ]
        self.assertListEqual(res, expect_res)

        res = db.get_entries("site2")
        expect_res = [
            {"url": "url21", "title": "title21", "updated": "21"},
        ]
        self.assertListEqual(res, expect_res)

        data = [
            ["site1", "url11", "title11", "11"],
            ["site1", "url13", "title13", "13"],
        ]
        db.upsert_many(data)

        db.delete_old_entries("site1", "12")
        res = db.get_entries("site1")
        expect_res = [
            {"url": "url13", "title": "title13", "updated": "13"},
            {"url": "url12", "title": "title12", "updated": "12"},
        ]
        self.assertListEqual(res, expect_res)
