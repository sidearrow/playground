select
  line_id,
  branch_line_id,
  sort_no,
  station_id,
  length,
  length_between
from
 line_station
order by
  line_id,
  sort_no
