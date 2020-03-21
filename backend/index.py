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
def action_index():
    return 'ok'


@app.route('/company')
def action_company():
    cur = connection.cursor()
    cur.execute('select * from company c'
                ' left join company_type ct on ct.company_type_id = c.company_type_id'
                ' where c.abolition_flg = 0'
                ' order by c.company_id')
    rows = cur.fetchall()

    res = []
    for row in rows:
        res.append({
            'companyCode': row['company_code'],
            'companyName': row['company_name'],
            'companyTypeName': row['company_type_name'],
            'length': float(row['length'])
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
    cur.execute('select c.company_name, c.company_code,'
                ' l.line_id, l.line_name, l.line_code'
                ' from line l'
                ' left join company c on c.company_id = l.company_id'
                ' where l.line_code = %s',
                (line_code))
    line_row = cur.fetchone()
    company = {
        'companyName': line_row['company_name'],
        'companyCode': line_row['company_code'],
    }
    line = {
        'lineName': line_row['line_name'],
        'lineCode': line_row['line_code'],
    }

    line_id = line_row['line_id']

    cur.execute('select s.station_id, l.line_name from line_station ls'
                ' left join line_station ls2'
                '   on ls2.station_id = ls.station_id'
                ' left join station s'
                '   on s.station_id = ls.station_id'
                ' left join line l'
                '   on l.line_id = ls2.line_id'
                ' where ls.line_id = %s and ls2.line_id <> %s'
                ' order by s.station_id, l.line_id',
                (line_id, line_id))
    rows = cur.fetchall()

    connect_lines = {}
    for row in rows:
        if row['station_id'] not in connect_lines:
            connect_lines[row['station_id']] = []
        connect_lines[row['station_id']].append(row['line_name'])

    cur.execute('select s.station_id, c.company_name, c.company_code, l.line_name, l.line_code,'
                ' s.station_name, s.station_name_kana, ls.length, s.status from line_station ls'
                ' left join line l on l.line_id = ls.line_id'
                ' left join company c on c.company_id = l.company_id'
                ' left join station s on s.station_id = ls.station_id'
                ' where l.line_code = %s',
                (line_code))
    rows = cur.fetchall()

    stations = []
    for row in rows:
        stations.append({
            'stationName': row['station_name'],
            'stationNameKana': row['station_name_kana'],
            'length': row['length'],
            'status': row['status'],
            'connect_lines': connect_lines[row['station_id']] \
                if row['station_id'] in connect_lines else []
        })

    return jsonify({
        'company': company,
        'line': line,
        'stations': stations,
    })


if __name__ == '__main__':
    app.run(debug=True)
