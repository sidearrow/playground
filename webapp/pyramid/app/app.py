from pyramid.view import view_config
from pyramid.request import Request
from pyramid.response import Response
from pyramid.config import Configurator


@view_config(
    route_name='index_get',
    renderer='./templates/index.html',
)
def index_get(request: Request):
    return {}


def includeme(config: Configurator):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('index_get', '/')
