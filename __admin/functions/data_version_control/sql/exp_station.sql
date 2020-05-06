select
  station_id,
  company_id,
  station_name,
  station_name_kana,
  station_name_wiki,
  prefecture_id,
  address,
  status,
  open_date,
  close_date
from
  station
order by
  station_id
