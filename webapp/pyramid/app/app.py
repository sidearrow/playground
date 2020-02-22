import functools
import hashlib
import math
import os
import pymysql
import random
import shutil
import string
import tempfile
import time
from pyramid import httpexceptions
from pyramid.view import view_config
from pyramid.request import Request
from pyramid.response import Response
from pyramid.config import Configurator

avatar_max_size = 1 * 1024 * 102
public_folder = os.path.join(os.path.dirname(__file__), '../../public')


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
    cur.execute(
        "SET SESSION sql_mode='TRADITIONAL,NO_AUTO_VALUE_ON_ZERO,ONLY_FULL_GROUP_BY'")

    return connection


def get_channel_list_info(channel_id=None):
    cur = dbh().cursor()
    cur.execute(
        'select * from channel order by id',
    )
    channels = cur.fetchall()
    description = ''

    for channel in channels:
        if channel['id'] == channel_id:
            description = c['description']
            break

    return channels, description


def login_required(func):
    @functools.wraps(func)
    def wrapper(request: Request):
        if not 'user_id' in request.session or not request.session['user_id']:
            return httpexceptions.HTTPSeeOther('/login')
        request.user_id = user_id = request.session['user_id']
        cur = dbh().cursor()
        cur.execute("select * from user where id = %s", (user_id))
        user = cur.fetchone()
        if not user:
            request.session['user_id'] = None
            return httpexceptions.HTTPSeeOther('/login')
        request.user = user
        return func(request)
    return wrapper


@view_config(
    route_name='initialize'
)
def action_initialize(request: Request):
    cur = dbh().cursor()
    cur.execute("DELETE FROM user WHERE id > 1000")
    cur.execute("DELETE FROM image WHERE id > 1001")
    cur.execute("DELETE FROM channel WHERE id > 10")
    cur.execute("DELETE FROM message WHERE id > 10000")
    cur.execute("DELETE FROM haveread")
    cur.close()
    return httpexceptions.exception_response(204)


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
        return httpexceptions.exception_response(403)
    request.session['user_id'] = row['id']
    return httpexceptions.HTTPSeeOther('/')


@view_config(
    route_name='logout'
)
def action_logout(request: Request):
    request.session['user_id'] = None
    return httpexceptions.HTTPSeeOther('/')


@view_config(
    route_name='channel',
    renderer='./templates/channel.html',
)
@login_required
def action_channel(request: Request):
    channel_id = request.matchdict['channel_id']
    channels, description = get_channel_list_info(channel_id)
    return {
        'is_login': True,
        'channels': channels,
        'channel_id': channel_id,
        'description': description,
    }


@view_config(
    route_name='register',
    renderer='./templates/register.html',
    request_method='GET',
)
def action_register_get(request: Request):
    return {}


@view_config(
    route_name='register',
    request_method='POST'
)
def action_register_post(request: Request):
    name = request.POST['name']
    pw = request.POST['password']
    if not name or not pw:
        return httpexceptions.exception_response(400)

    cur = dbh().cursor()
    salt = ''.join([random.choice(string.ascii_letters + string.digits)
                    for i in range(20)])
    pass_digest = hashlib.sha1((salt + pw).encode('utf-8')).hexdigest()
    try:
        cur.execute(
            "insert into user (name, salt, password, display_name, avatar_icon, created_at)"
            " values (%s, %s, %s, %s, %s, now())",
            (name, salt, pass_digest, name, 'default.png'),
        )
        cur.execute("select last_insert_id() as last_insert_id")
        user_id = cur.fetchone()['last_insert_id']
    except pymysql.IntegrityError:
        return httpexceptions.exception_response(409)

    request.session['user_id'] = user_id

    return httpexceptions.HTTPSeeOther('/')


@view_config(
    route_name='message',
    request_method='GET',
    renderer='json',
)
def action_message_get(request: Request):
    if 'user_id' not in request.session:
        return httpexceptions.exception_response(403)

    user_id = request.session['user_id']
    channel_id = request.GET['channel_id']
    last_message_id = request.GET['last_message_id']
    cur = dbh().cursor()
    cur.execute(
        "select msg.id, msg.created_at, msg.content, usr.name, usr.display_name, usr.avatar_icon"
        " from message msg"
        " left join user usr on usr.id = msg.user_id"
        " where msg.id > %s and msg.channel_id = %s"
        " order by msg.id desc limit 100",
        (last_message_id, channel_id)
    )
    rows = cur.fetchall()
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

    max_message_id = max(r['id'] for r in rows) if rows else 0
    cur.execute(
        'INSERT INTO haveread (user_id, channel_id, message_id, updated_at, created_at)'
        ' VALUES (%s, %s, %s, NOW(), NOW())'
        ' ON DUPLICATE KEY UPDATE message_id = %s, updated_at = NOW()',
        (user_id, channel_id, max_message_id, max_message_id)
    )

    return response


@view_config(
    route_name='message',
    request_method='POST',
)
def action_message_post(request: Request):
    user_id = request.session['user_id']
    cur = dbh().cursor()
    cur.execute('select * from user where id = %s', (user_id))
    user = cur.fetchone()
    message = request.POST.get('message')
    channel_id = request.POST.get('channel_id')
    if not user or not message or not channel_id:
        return httpexceptions.exception_response(403)
    cur.execute(
        "insert into message (channel_id, user_id, content, created_at) values (%s, %s, %s, now())",
        (channel_id, user_id, message)
    )
    return httpexceptions.exception_response(204)


@view_config(
    route_name='history',
    renderer='./templates/history.html',
)
@login_required
def action_history(request: Request):
    channel_id = request.matchdict['channel_id']
    page = request.GET.get('page')
    if not page:
        page = '1'
    if not page.isnumeric():
        return httpexceptions.exception_response(400)
    page = int(page)

    N = 20
    cur = dbh().cursor()
    cur.execute(
        "select count(*) as cnt from message where channel_id = %s", (channel_id))
    cnt = int(cur.fetchone()['cnt'])
    max_page = math.ceil(cnt / N)
    if not max_page:
        max_page = 1
    if not 1 <= page <= max_page:
        return httpexceptions.exception_response(400)

    cur.execute(
        "select * from message where channel_id = %s order by id desc limit %s offset %s",
        (channel_id, N, (page - 1) * N)
    )
    rows = cur.fetchall()

    messages = []
    for row in rows:
        r = {}
        r['id'] = row['id']
        cur.execute(
            "SELECT name, display_name, avatar_icon FROM user WHERE id = %s", (row['user_id'],))
        r['user'] = cur.fetchone()
        r['date'] = row['created_at'].strftime("%Y/%m/%d %H:%M:%S")
        r['content'] = row['content']
        messages.append(r)
    messages.reverse()

    channels, _ = get_channel_list_info(channel_id)

    return {
        'channels': channels,
        'channel_id': channel_id,
        'messages': messages,
        'max_page': max_page,
        'page': page,
    }


@view_config(
    route_name='fetch',
    renderer='json'
)
def action_fetch(request: Request):
    if 'user_id' not in request.session:
        return httpexceptions.exception_response(403)

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

    return res


@view_config(
    route_name='add_channel',
    renderer='./templates/add_channel.html',
    request_method='GET',
)
@login_required
def action_add_channel_get(request: Request):
    channels, _ = get_channel_list_info()
    return {'channels': channels}


@view_config(
    route_name='add_channel',
    request_method='POST',
)
@login_required
def actions_add_channel_post(request: Request):
    name = request.POST.get('name')
    description = request.POST.get('description')
    if not name or not description:
        return httpexceptions.exception_response(400)
    cur = dbh().cursor()
    cur.execute(
        'insert into channel (name, description, updated_at, created_at) values (%s, %s, now(), now())',
        (name, description)
    )
    channel_id = cur.lastrowid
    return httpexceptions.HTTPSeeOther('/channel/' + str(channel_id))


@view_config(
    route_name='profile',
    renderer='./templates/profile.html',
)
@login_required
def action_profile(request: Request):
    user_name = request.matchdict['user_name']
    channels, _ = get_channel_list_info()

    cur = dbh().cursor()
    cur.execute("select * from user where name = %s", (user_name))
    user = cur.fetchone()

    if not user:
        return httpexceptions.exception_response(404)

    self_profile = request.session['user_id'] == user['id']

    return {
        'channels': channels,
        'user': user,
        'self_profile': self_profile
    }


@view_config(
    route_name='profile_update'
)
@login_required
def action_profile_update(request: Request):
    user_id = request.session['user_id']
    if not user_id:
        return httpexceptions.exception_response(403)

    cur = dbh().cursor()
    cur.execute("select * from user where id = %s", (user_id))
    user = cur.fetchone()
    if not user:
        return httpexceptions.exception_response(403)

    display_name = request.POST.get('display_name')
    avatar_name = None
    avatar_data = None

    if 'avatar_icon' in request.POST:
        file = request.POST['avatar_icon']
        if file.filename:
            ext = os.path.splitext(file.filename)[
                1] if '.' in file.filename else ''
            if ext not in ('.jpg', '.jpeg', '.png', '.gif'):
                return httpexceptions.exception_response(400)

            with tempfile.NamedTemporaryFile(delete=False) as f:
                shutil.copyfileobj(file.file, f)

                if avatar_max_size < f.tell():
                    return httpexceptions.exception_response(400)

                f.seek(0)
                data = f.read()
                digest = hashlib.sha1(data).hexdigest()

                avatar_name = digest + ext
                file_path = public_folder + '/icons/' + avatar_name
                shutil.move(f.name, file_path)
                os.chmod(file_path, 0o664)

    if avatar_name:
        '''
        cur.execute(
            "INSERT INTO image (name, data) VALUES (%s, _binary %s)",
            (avatar_name, avatar_data)
        )
        '''
        cur.execute(
            "UPDATE user SET avatar_icon = %s WHERE id = %s",
            (avatar_name, user_id)
        )

    if display_name:
        cur.execute(
            "UPDATE user SET display_name = %s WHERE id = %s",
            (display_name, user_id)
        )

    return httpexceptions.HTTPSeeOther('/')


def includeme(config: Configurator):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('initialize', '/initialize')
    config.add_route('index', '/')
    config.add_route('login', '/login')
    config.add_route('logout', '/logout')
    config.add_route('channel', '/channel/{channel_id}')
    config.add_route('add_channel', '/add_channel')
    config.add_route('history', '/history/{channel_id}')
    config.add_route('register', '/register')
    config.add_route('profile', '/profile/{user_name}')
    config.add_route('profile_update', '/profile')
    config.add_route('message', '/message')
    config.add_route('fetch', '/fetch')
