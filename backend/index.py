from flask import Flask, jsonify
import pymysql
import enum


app = Flask(__name__)
connection = pymysql.connections \
    .Connection(host='localhost',
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
    cur = connection.cursor()
    cur.execute('select * from company c'
                ' left join company_type ct on ct.company_type_id = c.company_type_id')
    rows = cur.fetchall()

    res = []
    for row in rows:
        res.append({
            'companyCode': row['company_code'],
            'companyName': row['company_name'],
            'companyTypeName': row['company_type_name'],
        })

    return jsonify(res)


@app.route('/company/<company_code>')
def action_company_detail(company_code=None):
    cur = connection.cursor()
    cur.execute('select * from line l'
                ' left join company c on c.company_id = l.company_id'
                ' where c.company_code = %s',
                (company_code))
    rows = cur.fetchall()

    lines = []
    company_name = ''
    for row in rows:
        company_name = row['company_name']
        lines.append({
            'lineName': row['line_name'],
            'lineCode': row['line_code'],
        })

    return jsonify({
        'companyName': company_name,
        'lines': lines,
    })


@app.route('/line/<line_code>')
def action_line_detail(line_code=None):
    cur = connection.cursor()
    cur.execute('select * from line_station ls'
                ' left join line l on l.line_id = ls.line_id'
                ' left join company c on c.company_id = l.company_id'
                ' left join station s on s.station_id = ls.station_id'
                ' where l.line_code = %s',
                (line_code))
    rows = cur.fetchall()

    stations = []
    for row in rows:
        company = {
            'companyName': row['company_name'],
            'companyCode': row['company_code'],
        }
        line = {
            'lineName': row['line_name'],
            'lineCode': row['line_code'],
        }
        stations.append({
            'stationName': row['station_name'],
        })

    return jsonify({
        'company': company,
        'line': line,
        'stations': stations,
    })


if __name__ == '__main__':
    app.run(debug=True)
