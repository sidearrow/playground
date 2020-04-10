import csv
import os
import pymysql
from io import StringIO
from dotenv import load_dotenv
from flask import Flask, request, render_template

load_dotenv('.env')

app = Flask(__name__)

db = pymysql.connections.Connection(
    host=os.environ.get('DB_HOST'),
    port=int(os.environ.get('DB_PORT')),
    database=os.environ.get('DB_NAME'),
    user=os.environ.get('DB_USER'),
    password=os.environ.get('DB_PASSWORD'),
    charset='utf8mb4',
    cursorclass=MySQLdb.cursors.DictCursor,
    autocommit=False,
)


def action_login():
    return render_template('login.html')


def action_index():
    return render_template('index.html')


def action_line_index():
    db_lines = session.query(LineModel, CompanyModel) \
        .join(CompanyModel, CompanyModel.company_id == LineModel.company_id) \
        .all()

    view_lines = []
    for line, company in db_lines:
        view_lines.append({
            'line_id': line.line_id,
            'line_name': line.line_name,
            'company_name': company.company_name,
            'line_detail_url': '/line/{}'.format(line.line_id)
        })

    return render_template('line.html', lines=view_lines)


def action_line_detail(line_id):
    db_line = session.query(LineModel).get(line_id)
    db_line_stations = session.query(LineStationModel, StationModel) \
        .join(StationModel, StationModel.station_id == LineStationModel.station_id) \
        .filter(LineStationModel.line_id == line_id) \
        .all()

    view_line = {
        'line_name': db_line.line_name,
    }
    view_stations = []
    view_station_id_name_tsv = ''
    for line_station, station in db_line_stations:
        view_station_id_name_tsv += '{}\t{}\n'.format(station.station_id, station.station_name)
        view_stations.append({
            'station_detail_url': '/station/{}'.format(station.station_id),
            'sort_no': line_station.sort_no,
            'station_id': station.station_id,
            'station_name': station.station_name,
            'station_name_kana': station.station_name_kana or '',
            'length': line_station.length,
            'length_between': line_station.length_between or '',
        })

    return render_template('line_detail.html', line=view_line, stations=view_stations, station_id_name_tsv=view_station_id_name_tsv)


def action_station_bulk_update():
    # data = await request.form()

    for row in csv.DictReader(StringIO(data['bulkUpdateData'].strip()), delimiter='\t'):
        print(row)

    return row


def action_station_detail(station_id):
    db_station = session.query(StationModel).get(station_id)
    db_lines = session.query(LineStationModel, LineModel) \
        .join(LineModel, LineModel.line_id == LineStationModel.line_id) \
        .filter(LineStationModel.station_id == station_id) \
        .all()

    station = {
        'station_update_url': '/station/{}'.format(station_id),
        'station_name': db_station.station_name,
        'station_name_kana': db_station.station_name_kana,
        'station_name_wiki': db_station.station_name_wiki or '',
        'address': db_station.address,
        'open_date': db_station.open_date,
        'close_date': db_station.close_date,
    }
    lines = []
    for line_station, line in db_lines:
        lines.append({
            'line_id': line.line_id,
            'line_name': line.line_name,
            'line_detail_url': '/line/{}'.format(line.line_id),
        })

    return render_template('station_detail.html', station=station, lines=lines)


def action_station_update(station_id):
    # data = await request.form()

    station: StationModel = StationModel.query.filter_by(station_id=station_id).first()
    station.station_name = data['station_name']
    station.station_name_kana = data['station_name_kana']
    station.station_name_wiki = data['station_name_wiki']
    station.open_date = data['open_date'] if data['open_date'] != '' else None
    station.close_date = data['close_date'] if data['close_date'] != '' else None
    session.commit()

    return RedirectResponse(url='/station/{}'.format(station_id), status_code=302)


app.add_url_rule('/login', view_func=action_login)
app.add_url_rule('/', view_func=action_index)
app.add_url_rule('/line', view_func=action_line_index)
app.add_url_rule('/line/<line_id>', view_func=action_line_detail)
app.add_url_rule('/station/bulk-update', view_func=action_station_bulk_update, methods=['POST'])
app.add_url_rule('/station/<station_id>', view_func=action_station_detail)
app.add_url_rule('/station/<station_id>', view_func=action_station_update, methods=['POST'])
