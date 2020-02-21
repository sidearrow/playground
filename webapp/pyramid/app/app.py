import hashlib
import os
import pymysql
import time
from pyramid import httpexceptions
from pyramid.view import view_config
from pyramid.request import Request
from pyramid.response import Response
from pyramid.config import Configurator



def dbh():
    connection = pymysql.connections.Connection(
        host='localhost',
        port=3306,
        user='isucon',
        password='isucon',
        db='isubata',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )

    cur = connection.cursor()
    cur.execute("SET SESSION sql_mode='TRADITIONAL,NO_AUTO_VALUE_ON_ZERO,ONLY_FULL_GROUP_BY'")

    return connection


def get_channel_list_info(channel_id):
    cur = dbh().cursor()
    cur.execute(
        'select * from channel where id = %s order by id',
        (channel_id)
    )
    channels = cur.fetchall()
    cur.close()
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
    if 'user_id' in request.session:
        return httpexceptions.HTTPSeeOther('/channel/1')
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
    cur = dbh().cursor()
    cur.execute("select * from user where name = %s", (name,))
    row = cur.fetchone()
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
    cursor = dbh().cursor()
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


@view_config(
    route_name='fetch',
    renderer='json'
)
def action_fetch(request: Request):
    if 'user_id' not in request.session:
        httpexceptions.exception_response(403)

    time.sleep(1.0)

    user_id = request.session['user_id']

    cur = dbh().cursor()
    cur.execute('select id from channel')
    rows = cur.fetchall()
    channel_ids = [row['id'] for row in rows]

    res = []
    for channel_id in channel_ids:
        cur.execute(
            'select * from haveread where user_id = %s and channel_id = %s',
            (user_id, channel_id)
        )
        row = cur.fetchone()
        if row:
            cur.execute(
                'select count(*) as cnt from message where channel_id = %s and %s < id',
                (channel_id, row['message_id'])
            )
        else:
            cur.execute(
                'select count(*) as cnt from message where channel_id = %s',
                (channel_id)
            )

        res.append({
            'channel_id': channel_id,
            'unread': int(cur.fetchone()['cnt']),
        })

    cur.close()

    return res


def ext2mime(ext):
    if ext in ('.jpg', 'jpeg'):
        return 'image/jpeg'
    if ext == '.png':
        return 'image/png'
    if ext == '.gif':
        return 'image/gif'
    return ''


@view_config(
    route_name='icons'
)
def icons_get(request: Request):
    file_name = request.matchdict['file_name']
    cur = dbh().cursor()
    cur.execute('select * from image where name = %s', (file_name))
    row = cur.fetchone()
    cur.close()
    ext = os.path.splitext(file_name)[1] if '.' in file_name else ''
    mime = ext2mime(ext)
    if row and mime:
        return Response(row['data'], content_type=mime)


def includeme(config: Configurator):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('index', '/')
    config.add_route('login', '/login')
    config.add_route('channel', '/channel/{channel_id}')
    config.add_route('message', '/message')
    config.add_route('fetch', '/fetch')
    config.add_route('icons', '/icons/{file_name}')
