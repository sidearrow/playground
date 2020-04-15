from flask import g, redirect, render_template, request
from flask.views import View


def index():
    get_station_name = request.args.get('station_name', '')

    cur = g.db.cursor()
    cur.execute('''
    select sg.station_group_id, s.station_name,
        s.station_id, c.company_name_alias
    from station_group sg
    left join station_group_station sgs
        on sgs.station_group_id = sg.station_group_id
    left join station s
        on s.station_id = sgs.station_id
    left join company c
        on c.company_id = s.company_id
    where exists (
        select 1 from station ex_s
        where station_name like %s
            and ex_s.station_id = sgs.station_id
    )
    order by sg.station_group_id
    limit 50
    ''', ('%{}%'.format(get_station_name)))
    db_station_groups = cur.fetchall()

    station_groups = {}
    for station_group in db_station_groups:
        if station_group['station_group_id'] not in station_groups:
            station_groups[station_group['station_group_id']] = []
        station_groups[station_group['station_group_id']].append({
            'station_id': station_group['station_id'],
            'station_name': station_group['station_name'],
            'company_name': station_group['company_name_alias'],
        })

    return render_template(
        'pages/station_group/index.html',
        station_groups=station_groups
    )


def create():
    station_id = request.form.get('station_id')
    redirect_url = request.form.get('redirect_url')

    cur = g.db.cursor()
    try:
        cur.execute('''
        insert into station_group () values()
        ''')
        cur.execute('''
        select last_insert_id() as new_id
        ''')
        new_id = cur.fetchone()['new_id']
        cur.execute('''
        insert into station_group_station
        (station_group_id, station_id)
        values (%s, %s)
        ''', (new_id, station_id))
    except:
        g.db.rollback()
        abort(500)
    else:
        g.db.commit()

    return redirect(redirect_url, 302)


def station_create(station_group_id):
    station_id = request.form.get('station_id')
    redirect_url = request.form.get('redirect_url')

    cur = g.db.cursor()
    try:
        cur.execute('''
        insert station_group_station
        (station_group_id, station_id)
        values (%s, %s)
        ''', (station_group_id, station_id))
    except:
        g.db.rollback()
        abort(500)
    else:
        g.db.commit()

    return redirect(redirect_url, 302)

def station_delete(station_group_id, station_id):
    redirect_url = request.form.get('redirect_url')

    cur = g.db.cursor()
    try:
        cur.execute('''
        delete from station_group_station
        where station_group_id = %s and station_id = %s
        ''')
    except:
        g.db.rollback()
        abort(500)
    else:
        g.db.commit()

    return redirect(redirect_url, 302)
