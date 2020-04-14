import csv
import functools
import hashlib
import os
import pymysql
from io import StringIO
from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, session, g, abort

load_dotenv('.env')

app = Flask(__name__)
app.secret_key = 'railway_statistic_admin'


@app.before_request
def before_request():
    g.db = pymysql.connections.Connection(
        host=os.environ.get('DB_HOST'),
        port=int(os.environ.get('DB_PORT')),
        database=os.environ.get('DB_NAME'),
        user=os.environ.get('DB_USER'),
        password=os.environ.get('DB_PASSWORD'),
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=False,
    )

    g.__old_input = session.get('__old_input', {})
    session['__old_input'] = request.form


@app.after_request
def after_request(response):
    g.db.close()
    return response


@app.context_processor
def app_context_processor():
    data = {
        'is_auth': 'is_auth' in session and session['is_auth'] == True,
        'old': g.__old_input,
    }

    return data


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
    cur = g.db.cursor()
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
    cur = g.db.cursor()
    cur.execute('''
    select l.line_id, l.line_name, c.company_id, c.company_name_alias
    from line l
    left join company c
      on c.company_id = l.company_id
    ''')
    db_lines = cur.fetchall()

    view_lines = {}
    for row in db_lines:
        if row['company_id'] not in view_lines:
            view_lines[row['company_id']] = {
                'company_name': row['company_name_alias'],
                'lines': [],
            }
        view_lines[row['company_id']]['lines'].append({
            'line_id': row['line_id'],
            'line_name': row['line_name'],
            'line_detail_url': '/line/{}'.format(row['line_id'])
        })

    return render_template('line.html', lines=view_lines)


@middleware_auth
def action_line_detail(line_id):
    is_bulk_update_error = session.get('is_bulk_update_error', False)
    session['is_bulk_update_error'] = False

    cur = g.db.cursor()
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
    view_station_id_name_tsv = 'line_id\tstation_id\tstation_name\n'
    max_sort_no = 0
    for row in db_data:
        max_sort_no = max(max_sort_no, row['sort_no'])
        view_station_id_name_tsv += '{}\t{}\t{}\n'.format(
            line_id, row['station_id'], row['station_name'])
        view_stations.append({
            'station_detail_url': '/station/{}'.format(row['station_id']),
            'sort_no': row['sort_no'],
            'station_id': row['station_id'],
            'station_name': row['station_name'],
            'station_name_kana': row['station_name_kana'] or '',
            'length': row['length'] or '',
            'length_between': row['length_between'] or '',
            'station_delete_url': '/line/{}/station/{}/delete'.format(line_id, row['station_id'])
        })

    return render_template(
        'line_detail.html',
        is_bulk_update_error=is_bulk_update_error,
        line=view_line,
        stations=view_stations,
        station_id_name_tsv=view_station_id_name_tsv,
        station_add_url='/line/{}/station_add'.format(line_id),
        next_sort_no=max_sort_no + 1)


@middleware_auth
def action_station_bulk_update():
    bulk_update_data = request.form['bulkUpdateData']
    bulk_update_data_reader = csv.DictReader(StringIO(bulk_update_data.strip()), delimiter='\t')

    cur = g.db.cursor()
    try:
        for row in bulk_update_data_reader:
            sql = 'update line_station set'
            update_param = []
            where_param = {}
            for key in row:
                if key in ['line_id', 'station_id', 'length', 'length_between']:
                    if key in ['line_id', 'station_id']:
                        where_param[key] = row[key]
                    else:
                        sql += ' {} = %s,'.format(key)
                        update_param.append(row[key])
            sql = sql[:-1]
            sql += ' where line_id = %s and station_id = %s'
            update_param.append(where_param['line_id'])
            update_param.append(where_param['station_id'])
            cur.execute(sql, tuple(update_param))
    except Exception as e:
        g.db.rollback()
        session['is_bulk_update_error'] = True
    else:
        g.db.commit()

    return redirect(request.referrer, 302)


@middleware_auth
def action_station_detail(station_id):
    cur = g.db.cursor()
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


@middleware_auth
def action_station_update(station_id):
    cur = g.db.cursor()
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
    g.db.commit()

    return redirect('/station/{}'.format(station_id), 302)


@middleware_auth
def action_station_index():
    station_id = request.args.get('station_id', '')
    station_name = request.args.get('station_name', '')

    cur = g.db.cursor()

    params = []
    where_statement = []
    if station_id != '':
        params.append('%{}%'.format(station_id))
        where_statement.append('s.station_id like %s')
    if station_name != '':
        params.append('%{}%'.format(station_name))
        where_statement.append('s.station_name like %s')

    where_statement_str = '' if len(where_statement) == 0 \
        else 'where ' + ' and '.join(where_statement)

    sql = '''
    select s.station_id, s.station_name, ls.line_id, l.line_name
    from station s
    left join line_station ls
        on ls.station_id = s.station_id
    left join line l
        on l.line_id = ls.line_id
    {} limit 30
    '''.format(where_statement_str)

    cur.execute(sql, tuple(params))
    db_stations = cur.fetchall()

    stations = {}
    for station in db_stations:
        if station['station_id'] not in stations:
            stations[station['station_id']] = {
                'station_id': station['station_id'],
                'station_name': station['station_name'],
                'station_detail_url': '/station/{}'.format(station['station_id']),
                'line_add_url': '/station/{}/line'.format(station['station_id']),
                'lines': [],
            }
        stations[station['station_id']]['lines'].append({
            'line_name': station['line_name'],
            'line_detail_url': '/line/{}'.format(station['line_id'])
        })

    return render_template(
        'station.html',
        stations=stations,
        search={'station_name': station_name},
    )


@middleware_auth
def action_station_create():
    cur = g.db.cursor()
    cur.execute('''
    select company_id, company_name_alias from company
    ''')
    db_companies = cur.fetchall()

    cur.execute('''
    select prefecture_id, prefecture_name from prefecture
    ''')
    db_prefecture = cur.fetchall()

    cur.execute('''
    select max(station_id) + 1 as next_id from station
    ''')
    next_id = cur.fetchone()['next_id']

    companies = []
    for company in db_companies:
        companies.append({
            'company_id': company['company_id'],
            'company_name': company['company_name_alias'],
        })

    return render_template('station_create.html', companies=companies, prefectures=db_prefecture, next_id=next_id)


@middleware_auth
def action_station_create_post():
    station_id = request.form.get('station_id')
    station_name = request.form.get('station_name')
    station_name_kana = request.form.get('station_name_kana')
    address = request.form.get('address')
    company_id = request.form.get('company_id')
    prefecture_id = request.form.get('prefecture_id')

    try:
        cur = g.db.cursor()
        cur.execute('''
        insert into station (
            station_id, station_name, station_name_kana,
            address, company_id, prefecture_id, status)
        values (%s, %s, %s, %s, %s, %s, 0)
        ''', (station_id, station_name, station_name_kana,
              address, company_id, prefecture_id))
    except Exception as e:
        print(e)
        abort(500)

    g.db.commit()

    return redirect('/station?station_name={}'.format(station_name), 302)


@middleware_auth
def action_line_add_station(line_id):
    station_id = request.form.get('station_id')
    sort_no = request.form.get('sort_no')

    try:
        cur = g.db.cursor()
        cur.execute('''
        insert into line_station (line_id, station_id, sort_no)
        values (%s, %s, %s)
        ''', (line_id, station_id, sort_no))
    except Exception as e:
        g.db.rollback()
        print(e)
        abort(500)

    g.db.commit()

    return redirect(request.referrer, 302)


@middleware_auth
def action_line_station_delete(line_id, station_id):
    try:
        cur = g.db.cursor()
        cur.execute('''
        delete from line_station
        where line_id = %s and station_id = %s
        ''', (line_id, station_id))
    except Exception as e:
        g.db.rollback()
        abort(500)

    g.db.commit()

    return redirect('/line/{}'.format(line_id), 302)


app.add_url_rule('/login', view_func=action_login)
app.add_url_rule('/login', view_func=action_login_post, methods=['POST'])
app.add_url_rule('/logout', view_func=action_logout)
app.add_url_rule('/', view_func=action_index)
app.add_url_rule('/line', view_func=action_line_index)
app.add_url_rule('/line/<line_id>', view_func=action_line_detail)
app.add_url_rule('/line/<line_id>/station_add', view_func=action_line_add_station, methods=['POST'])
app.add_url_rule('/line/<line_id>/station/<station_id>/delete', view_func=action_line_station_delete, methods=['POST'])
app.add_url_rule('/station', view_func=action_station_index)
app.add_url_rule('/station/create', view_func=action_station_create)
app.add_url_rule('/station/create', view_func=action_station_create_post, methods=['POST'])
app.add_url_rule('/station/bulk-update', view_func=action_station_bulk_update, methods=['POST'])
app.add_url_rule('/station/<station_id>', view_func=action_station_detail)
app.add_url_rule('/station/<station_id>', view_func=action_station_update, methods=['POST'])

if __name__ == '__main__':
    if os.environ.get('ENV') == 'development':
        app.config['TEMPLATES_AUTO_RELOAD'] = True
        app.run(debug=True, use_reloader=True)
    if os.environ.get('ENV') == 'production':
        app.run()
