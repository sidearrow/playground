import pymysql

db = pymysql.connections \
    .Connection(host='localhost',
                user='railway',
                password='railway',
                db='railway',
                charset='utf8mb4',
                cursorclass=pymysql.cursors.DictCursor)


def getCursor():
    return db.cursor()
