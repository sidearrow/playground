from fastapi import FastAPI, Request
from database import session
from models import LineModel, LineStationModel, StationModel
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory='templates')


@app.get('/')
def action_index():
    return {'aa': 'aa'}


@app.get('/line')
def action_line_index(request: Request):
    db_lines = session.query(LineModel).all()

    view_lines = []
    for line in db_lines:
        view_lines.append({
            'line_id': line.line_id,
            'line_name': line.line_name,
            'company_name': line.company.company_name,
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
    for line_station, station in db_line_stations:
        view_stations.append({
            'station_detail_url': '/station/{}'.format(station.station_id),
            'sort_no': line_station.sort_no,
            'station_name': station.station_name,
            'station_name_kana': station.station_name_kana or '',
            'length': line_station.length,
            'length_between': line_station.length_between or '',
        })

    return templates.TemplateResponse('line_detail.html', {'request': request, 'line': view_line, 'stations': view_stations})


@app.get('/station/{station_id}')
def action_station_detail(request: Request, station_id: str):
    db_station = session.query(StationModel).get(station_id)
    station = {
        'station_name': db_station.station_name,
        'station_name_kana': db_station.station_name_kana,
        'station_name_wiki': db_station.station_name_wiki,
        'address': db_station.address,
    }

    return templates.TemplateResponse('station_detail.html', {'request': request, 'station': station})
