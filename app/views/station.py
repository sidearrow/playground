import flask

def index():
    station_id = flask.request.args.get('station_id', '')
    station_name = flask.request.args.get('station_name', '')

    cur = flask.g.db.cursor()

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
    select s.station_id, s.station_name, ls.line_id,
        l.line_name, c.company_name_alias
    from (
        select station_id, station_name
        from station {} limit 20
    ) s
    left join line_station ls
        on ls.station_id = s.station_id
    left join line l
        on l.line_id = ls.line_id
    left join company c
        on c.company_id = l.company_id
    left join station_group sg1
        on s.station_id = sg1.station_id
    left join station_group sg2
        on sg2.station_group_id = sg1.station_group_id
    left join station s2
        on s2.station_id = sg2.station_id
    left join company c2
        on c2.company_id = s2.company_id
    left join station_line sl2
        on sl2.station_id = sg2.station_id
    left join line l2
        on l2.line_id = sl2.line_id
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

    return flask.render_template(
        'station.html',
        stations=stations,
        search={'station_name': station_name},
    )
