from ftplib import FTP
from io import BytesIO


class FTPClient:
    def __init__(self, host: str, user: str, password: str) -> None:
        self.__client = FTP(
            host=host,
            user=user,
            passwd=password,
        )

    def get(self, path):
        cmd = "RETR " + path
        f = BytesIO()
        self.__client.retrbinary(cmd, f.write)
        f.seek(0)
        return f

    def put(self, path: str, fp):
        cmd = "STOR " + path
        self.__client.storbinary(cmd, fp)