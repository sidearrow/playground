import hashlib
import pymysql
from pyramid import httpexceptions
from pyramid.view import view_config
from pyramid.request import Request
from pyramid.response import Response
from pyramid.config import Configurator


db_connection = pymysql.connections.Connection(
    host='localhost',
    user='isucon',
    password='isucon',
    db='isubata',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)


def get_channel_list_info(channel_id):
    cursor = db_connection.cursor()
    cursor.execute(
        'select * from channel where id = %s order by id',
        (channel_id)
    )
    channels = cursor.fetchall()
    description = ''

    for channel in channels:
        if channel['id'] == channel_id:
            description = c['description']
            break

    return channels, description


@view_config(
    route_name='index',
    renderer='./templates/index.html',
)
def action_index_get(request: Request):
    return {}


@view_config(
    route_name='login',
    renderer='./templates/login.html',
    request_method='GET',
)
def action_login_get(request: Request):
    return {}


@view_config(
    route_name='login',
    request_method='POST',
)
def action_login_post(request: Request):
    name = request.POST['name']
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM user WHERE name = %s", (name,))
    row = cursor.fetchone()
    if not row or row['password'] != hashlib.sha1((row['salt'] + request.POST['password']).encode('utf-8')).hexdigest():
        raise httpexceptions.exception_response(403)
    request.session['user_id'] = row['id']
    return httpexceptions.HTTPPermanentRedirect('/')


@view_config(
    route_name='channel',
    renderer='./templates/channel.html',
)
def action_channel(request: Request):
    channel_id = request.matchdict['channel_id']
    channels, description = get_channel_list_info(channel_id)
    return {
        'channels': channels,
        'channel_id': channel_id,
        'description': description,
    }


@view_config(
    route_name='message',
    renderer='json'
)
def action_message(request: Request):
    if 'user_id' not in request.session:
        httpexceptions.exception_response(403)

    channel_id = request.GET['channel_id']
    last_message_id = request.GET['last_message_id']
    cursor = db_connection.cursor()
    cursor.execute(
        "select msg.id, msg.created_at, msg.content, usr.name, usr.display_name, usr.avatar_icon"
        " from message msg"
        " left join user usr on usr.id = msg.user_id"
        " where msg.id > %s and msg.channel_id = %s"
        " order by msg.id desc limit 100",
        (last_message_id, channel_id)
    )
    rows = cursor.fetchall()
    response = []
    for row in rows:
        r = {}
        r['id'] = row['id']
        r['user'] = {
            'name': row['name'],
            'display_name': row['display_name'],
            'avatar_icon': row['avatar_icon'],
        }
        r['date'] = row['created_at'].strftime("%Y/%m/%d %H:%M:%S")
        r['content'] = row['content']
        response.append(r)
    response.reverse()

    return response


def includeme(config: Configurator):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('index', '/')
    config.add_route('login', '/login')
    config.add_route('channel', '/channel/{channel_id}')
    config.add_route('message', '/message')
