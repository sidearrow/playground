from io import BytesIO
from ftplib import FTP

HOST = "s205.xrea.com"
USER = "matometane"
PASS = "2RpvXUELxcp8"


class FTPClient:
    def __init__(self) -> None:
        self.__conn = self.__get_conn()

    def __get_conn(self):
        conn = FTP(HOST)
        conn.login(USER, PASS)
        return conn

    def __check_conn(self):
        try:
            self.__conn.voidcmd("NOOP")
        except Exception as e:
            print("...reconnect")
            self.__conn = self.__get_conn()

    def upload(self, data: str) -> None:
        self.__check_conn()
        fp = BytesIO(data.encode("utf-8"))
        self.__conn.storbinary("STOR /public_html/index.html", fp)

    def close(self) -> None:
        try:
            self.__conn.close()
        except:
            pass


fc = FTPClient()
fc.upload("index")
