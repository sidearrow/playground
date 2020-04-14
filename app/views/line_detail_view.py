from flask import g, render_template, session

from flask.views import View


class LineDetailView(View):
    def dispatch_request(self, line_id):
        is_bulk_update_error = session.get('is_bulk_update_error', False)
        session['is_bulk_update_error'] = False

        cur = g.db.cursor()
        cur.execute('''
        select line_name from line where line_id = %s
        ''', (line_id))
        db_data = cur.fetchone()

        view_line = {
            'line_name': db_data['line_name'],
        }

        cur.execute('''
        select ls.sort_no, ls.op_kilo, ls.op_kilo_between, ls.real_kilo, ls.real_kilo_between,
            s.station_id, s.station_name, s.station_name_kana
        from line_station ls
        left join station s
            on s.station_id = ls.station_id
        where ls.line_id = %s
        ''', (line_id))
        db_data = cur.fetchall()

        view_stations = []
        view_station_id_name_tsv = 'line_id\tstation_id\tstation_name\n'
        max_sort_no = 0
        for row in db_data:
            max_sort_no = max(max_sort_no, row['sort_no'])
            view_station_id_name_tsv += '{}\t{}\t{}\n'.format(
                line_id, row['station_id'], row['station_name'])
            view_stations.append({
                'station_detail_url': '/station/{}'.format(row['station_id']),
                'sort_no': row['sort_no'],
                'station_id': row['station_id'],
                'station_name': row['station_name'],
                'station_name_kana': row['station_name_kana'] or '',
                'length': row['op_kilo'] or '',
                'length_between': row['op_kilo_between'] or '',
                'real_kilo': row['real_kilo'] or '',
                'real_kilo_between': row['real_kilo_between'] or '',
                'station_delete_url': '/line/{}/station/{}/delete'.format(line_id, row['station_id'])
            })

        return render_template(
            'line_detail.html',
            is_bulk_update_error=is_bulk_update_error,
            line=view_line,
            stations=view_stations,
            station_id_name_tsv=view_station_id_name_tsv,
            station_add_url='/line/{}/station_add'.format(line_id),
            next_sort_no=max_sort_no + 1)
