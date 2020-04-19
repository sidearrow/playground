import pymysql


def getConnection(auto_commit=False):
    db = pymysql.connections \
        .Connection(host='localhost',
                    user='railway',
                    password='railway',
                    db='railway',
                    charset='utf8mb4',
                    cursorclass=pymysql.cursors.DictCursor)
    db.autocommit(auto_commit)

    return db
