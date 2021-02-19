import os
from unittest import TestCase
from unittest.mock import MagicMock, patch
from src.downloader import Downloader


class DownloaderTest(TestCase):
    def setUp(self) -> None:
        os.environ["ENV"] = "DEVELOPMENT"

        self.m_download_site = MagicMock()
        self.m_download_site.site_id = "test"
        self.m_download_site.site_name = "test"
        self.m_download_site.site_url = "test"
        self.m_download_site.rss_url = "test"

        self.m_get_rss = patch("src.downloader.get_rss").start()

    def tearDown(self) -> None:
        patch.stopall()

    def test_get_rss_fail(self):
        self.m_get_rss.side_effect = [Exception]
        s3_client = MagicMock()
        downloader = Downloader(s3_client, self.m_download_site)
        downloader.exec()
        self.assertEqual(s3_client.get_entries.call_count, 0)
        self.assertEqual(s3_client.put_entries.call_count, 0)

    def test_get_data_fail(self):
        self.m_get_rss.return_value = [
            {"url": "url1", "updated": "updated1"},
            {"url": "url2", "updated": "updated2"},
        ]

        s3_client = MagicMock()
        s3_client.get_entries.side_effect = [Exception]
        downloader = Downloader(s3_client, self.m_download_site)
        downloader.exec()
        expect_put_entries = [
            {"url": "url2", "updated": "updated2"},
            {"url": "url1", "updated": "updated1"},
        ]
        put_entries = s3_client.put_entries.call_args[0][1]["entries"]
        self.assertListEqual(expect_put_entries, put_entries)

    def test_no_update(self):
        self.m_get_rss.return_value = [
            {"url": "url1", "updated": "updated1"},
            {"url": "url2", "updated": "updated2"},
        ]

        s3_client = MagicMock()
        s3_client.get_entries.return_value = {"entries": self.m_get_rss.return_value}
        downloader = Downloader(MagicMock(), self.m_download_site)
        downloader.exec()
        self.assertEqual(s3_client.put_entries.call_count, 0)

    def test_update(self):
        self.m_get_rss.return_value = [
            {"url": "url1", "updated": "updated1"},
            {"url": "url2", "updated": "updated2"},
        ]

        s3_client = MagicMock()
        s3_client.get_entries.return_value = {
            "sites": "sites",
            "entries": [
                {"url": "url1", "updated": "updated1"},
                {"url": "url3", "updated": "updated3"},
            ],
        }
        downloader = Downloader(s3_client, self.m_download_site, 2)
        downloader.exec()
        expect_put_entries = [
            {"url": "url3", "updated": "updated3"},
            {"url": "url2", "updated": "updated2"},
        ]
        put_entries = s3_client.put_entries.call_args[0][1]["entries"]
        self.assertListEqual(expect_put_entries, put_entries)
