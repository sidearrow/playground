class Config:
    __FTP_PASSIVE_HOST = "file-transfer-sandbox-ftp-passive"
    __FTP_PASSIVE_USER = "test-user"
    __FTP_PASSIVE_PASSWORD = "test-password"

    @property
    def ftp_passive_host(self):
        return self.__FTP_PASSIVE_HOST

    @property
    def ftp_passive_user(self):
        return self.__FTP_PASSIVE_USER

    @property
    def ftp_passive_password(self):
        return self.__FTP_PASSIVE_PASSWORD