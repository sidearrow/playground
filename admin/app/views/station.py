import flask

def index():
    station_id = flask.request.args.get('station_id', '')
    station_name = flask.request.args.get('station_name', '')

    cur = flask.g.db.cursor()

    params = []
    where_statement = []
    if station_id != '':
        params.append('%{}%'.format(station_id))
        where_statement.append('station_id like %s')
    if station_name != '':
        params.append('%{}%'.format(station_name))
        where_statement.append('station_name like %s')

    where_statement_str = '' if len(where_statement) == 0 \
        else 'where ' + ' and '.join(where_statement)

    sql = '''
    select s.station_id, s.station_name, lss.line_id,
        l.line_name, c.company_name_alias
    from (
        select station_id, station_name
        from station {} limit 20
    ) s
    left join line_section_station lss
        on lss.station_id = s.station_id
    left join line l
        on l.line_id = lss.line_id
    left join company c
        on c.company_id = l.company_id
    '''.format(where_statement_str)

    cur.execute(sql, tuple(params))
    db_stations = cur.fetchall()

    stations = {}
    station_id_list = []
    for station in db_stations:
        if station['station_id'] not in stations:
            station_id_list.append(station['station_id'])
            stations[station['station_id']] = {
                'station_id': station['station_id'],
                'station_name': station['station_name'],
                'station_detail_url': '/station/{}'.format(station['station_id']),
                'line_add_url': '/station/{}/line'.format(station['station_id']),
                'lines': [],
                'group_stations': {},
            }
        stations[station['station_id']]['lines'].append({
            'line_name': station['line_name'],
            'line_detail_url': '/line/{}'.format(station['line_id'])
        })

    sql = '''
    select sgs1.station_id key_station_id, s.station_id, s.station_name,
        l.line_name, c.company_name
    from station_group_station sgs1
    left join station_group_station sgs2
        on sgs2.station_group_id = sgs1.station_group_id
    left join station s
        on s.station_id = sgs2.station_id
    left join line_section_station lss
        on lss.station_id = s.station_id
    left join line l
        on l.line_id = lss.line_id
    left join company c
        on c.company_id = s.company_id
    where sgs1.station_id in ({})
    '''.format(','.join(map(str, station_id_list)))
    cur.execute(sql)
    db_station_group = cur.fetchall()

    group_stations = {}
    for row in db_station_group:
        if row['key_station_id'] not in group_stations:
            group_stations[row['key_station_id']] = {}
        if row['station_id'] not in group_stations[row['key_station_id']]:
            group_stations[row['key_station_id']][row['station_id']] = {
                'station_name': row['station_name'],
                'company_name': row['company_name'],
                'lines': []
            }
        group_stations[row['key_station_id']][row['station_id']]['lines'].append({
            'line_name': row['line_name']
        })

    for station_id, group_station in group_stations.items():
        stations[station_id]['group_stations'] = group_station

    return flask.render_template(
        'station.html',
        stations=stations,
        search={'station_name': station_name},
    )
