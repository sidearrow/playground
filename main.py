import csv
from io import StringIO
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from starlette.responses import RedirectResponse

from database import session
from models import CompanyModel, LineModel, LineStationModel, StationModel

app = FastAPI()
templates = Jinja2Templates(directory='templates')


@app.get('/')
def action_index(request: Request):
    return templates.TemplateResponse('index.html', {'request': request})


@app.get('/line')
def action_line_index(request: Request):
    db_lines = session.query(LineModel,CompanyModel) \
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

    return templates.TemplateResponse('line.html', {'request': request, 'lines': view_lines})


@app.get('/line/{line_id}')
def action_line_detail(request: Request, line_id: str):
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

    return templates.TemplateResponse('line_detail.html', {'request': request, 'line': view_line, 'stations': view_stations, 'station_id_name_tsv': view_station_id_name_tsv})


@app.post('/station/bulk-update')
async def action_station_bulk_update(request: Request):
    data = await request.form()

    for row in csv.DictReader(StringIO(data['bulkUpdateData'].strip()), delimiter='\t'):
        print(row)

    return row


@app.get('/station/{station_id}')
def action_station_detail(request: Request, station_id: str):
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

    return templates.TemplateResponse('station_detail.html', {'request': request, 'station': station, 'lines': lines})


@app.post('/station/{station_id}')
async def action_station_update(request: Request, station_id: str):
    data = await request.form()

    station: StationModel = StationModel.query.filter_by(station_id=station_id).first()
    station.station_name = data['station_name']
    station.station_name_kana = data['station_name_kana']
    station.station_name_wiki = data['station_name_wiki']
    station.open_date = data['open_date'] if data['open_date'] != '' else None
    station.close_date = data['close_date'] if data['close_date'] != '' else None
    session.commit()

    return RedirectResponse(url='/station/{}'.format(station_id), status_code=302)
