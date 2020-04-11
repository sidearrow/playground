import csv
import functools
import hashlib
import os
import pymysql
from io import StringIO
from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, session

load_dotenv('.env')

app = Flask(__name__)
app.secret_key = 'railway_statistic_admin'

db = pymysql.connections.Connection(
    host=os.environ.get('DB_HOST'),
    port=int(os.environ.get('DB_PORT')),
    database=os.environ.get('DB_NAME'),
    user=os.environ.get('DB_USER'),
    password=os.environ.get('DB_PASSWORD'),
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor,
    autocommit=False,
)

config = {
    'password': os.environ.get('SITE_PASSWORD')
}


def middleware_auth(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if 'is_auth' not in session or session['is_auth'] == False:
            return redirect('/login', 302)
        return func(*args, **kwargs)
    return wrapper


def action_login():
    return render_template('login.html')


def action_login_post():
    input_password = request.form['password']
    if config['password'] != hashlib.sha256(input_password.encode('utf-8')).hexdigest():
        return redirect('/login', 302)
    session['is_auth'] = True
    return redirect('/', 302)

def action_logout():
    session['is_auth'] = False

    return redirect('/login', 302)


@middleware_auth
def action_index():
    cur = db.cursor()
    cur.execute('select count(*) cnt from station')
    db_station_cnt = cur.fetchone()

    cur.execute('select count(*) cnt from line')
    db_line_cnt = cur.fetchone()

    return render_template(
        'index.html',
        station_cnt=db_station_cnt['cnt'],
        line_cnt=db_line_cnt['cnt'],
    )


@middleware_auth
def action_line_index():
    cur = db.cursor()
    cur.execute('''
    select l.line_id, l.line_name, c.company_name
    from line l
    left join company c
      on c.company_id = l.company_id
    ''')
    db_lines = cur.fetchall()

    view_lines = []
    for row in db_lines:
        view_lines.append({
            'line_id': row['line_id'],
            'line_name': row['line_name'],
            'company_name': row['company_name'],
            'line_detail_url': '/line/{}'.format(row['line_id'])
        })

    return render_template('line.html', lines=view_lines)


def action_line_detail(line_id):
    cur = db.cursor()
    cur.execute('''
    select line_name from line where line_id = %s
    ''', (line_id))
    db_data = cur.fetchone()

    view_line = {
        'line_name': db_data['line_name'],
    }

    cur.execute('''
    select ls.sort_no, ls.length, ls.length_between,
      s.station_id, s.station_name, s.station_name_kana
    from line_station ls
    left join station s
      on s.station_id = ls.station_id
    where ls.line_id = %s
    ''', (line_id))
    db_data = cur.fetchall()

    view_stations = []
    view_station_id_name_tsv = ''
    for row in db_data:
        view_station_id_name_tsv += '{}\t{}\n'.format(
            row['station_id'], row['station_name'])
        view_stations.append({
            'station_detail_url': '/station/{}'.format(row['station_id']),
            'sort_no': row['sort_no'],
            'station_id': row['station_id'],
            'station_name': row['station_name'],
            'station_name_kana': row['station_name_kana'] or '',
            'length': row['length'] or '',
            'length_between': row['length_between'] or '',
        })

    return render_template(
        'line_detail.html',
        line=view_line,
        stations=view_stations,
        station_id_name_tsv=view_station_id_name_tsv)


def action_station_bulk_update():
    # data = await request.form()

    for row in csv.DictReader(StringIO(data['bulkUpdateData'].strip()), delimiter='\t'):
        print(row)

    return row


def action_station_detail(station_id):
    cur = db.cursor()
    cur.execute('''
    select *
    from station
    where station_id = %s
    ''', (station_id))
    db_station = cur.fetchone()

    cur.execute('''
    select l.line_id, l.line_name
    from line_station ls
    left join line l
      on l.line_id = ls.line_id
    where ls.station_id = %s
    ''', (station_id))
    db_lines = cur.fetchall()

    station = {
        'station_update_url': '/station/{}'.format(station_id),
        'station_name': db_station['station_name'],
        'station_name_kana': db_station['station_name_kana'],
        'station_name_wiki': db_station['station_name_wiki'] or '',
        'address': db_station['address'],
        'open_date': db_station['open_date'],
        'close_date': db_station['close_date'],
    }

    lines = []
    for row in db_lines:
        lines.append({
            'line_id': row['line_id'],
            'line_name': row['line_name'],
            'line_detail_url': '/line/{}'.format(row['line_id']),
        })

    return render_template('station_detail.html', station=station, lines=lines)


def action_station_update(station_id):
    cur = db.cursor()
    cur.execute('''
    update station set
      station_name = %s,
      station_name_kana = %s,
      station_name_wiki = %s,
      open_date = %s,
      close_date = %s
    where station_id = %s
    ''', (
        request.form['station_name'],
        request.form['station_name_kana'],
        request.form['station_name_wiki'],
        None if request.form['open_date'] == '' else request.form['open_date'],
        None if request.form['close_date'] == '' else request.form['close_date'],
        station_id
    ))
    db.commit()

    return redirect('/station/{}'.format(station_id), 302)


app.add_url_rule('/login', view_func=action_login)
app.add_url_rule('/login', view_func=action_login_post, methods=['POST'])
app.add_url_rule('/logout', view_func=action_logout)
app.add_url_rule('/', view_func=action_index)
app.add_url_rule('/line', view_func=action_line_index)
app.add_url_rule('/line/<line_id>', view_func=action_line_detail)
app.add_url_rule('/station/bulk-update', view_func=action_station_bulk_update, methods=['POST'])
app.add_url_rule('/station/<station_id>', view_func=action_station_detail)
app.add_url_rule('/station/<station_id>', view_func=action_station_update, methods=['POST'])

if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True, use_reloader=True)
