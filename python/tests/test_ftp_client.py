from tempfile import NamedTemporaryFile
from tests import BaseTest
from src.ftp_client import FTPClient


class FTPCLientTest(BaseTest):
    def test_main(self):
        self.__ftp_client = FTPClient(
            host=self.config.ftp_passive_host,
            user=self.config.ftp_passive_user,
            password=self.config.ftp_passive_password,
        )
        f = NamedTemporaryFile()
        f.write(b"test")
        f.seek(0)
        self.__ftp_client.put("test.txt", f)

        res = self.__ftp_client.get("test.txt")
        self.assertEqual(res.read().decode("utf-8"), "test")
