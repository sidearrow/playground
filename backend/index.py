from flask import Flask
import pymysql


app = Flask(__name__)
db = pymysql.connect(host='localhost',
                     user='railway',
                     password='railway',
                     db='railway',
                     charset='utf8mb4',
                     cursorclass=pymysql.cursors.DictCursor)


@app.route('/')
def hello_world():
    return "Hello World!"

@app.route('/company')
def action_company():
    return ''


if __name__ == '__main__':
    app.run(debug=True)
