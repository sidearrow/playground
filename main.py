from fastapi import FastAPI, Request
from database import session
from models import LineModel
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
    return templates.TemplateResponse('line_detail.html', {'request': request})
