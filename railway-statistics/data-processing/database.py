import pymysql


def get_connection(auto_commit=False):
    con = pymysql.connections.Connection(host='localhost', port=33060, user='root', password='root',
                                         db='railway_statistics', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    con.autocommit(auto_commit)

    return con
