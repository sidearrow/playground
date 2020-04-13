select
  company_id,
  company_code,
  company_name,
  company_name_alias,
  company_name_kana,
  company_type_id,
  length,
  line_num,
  station_num,
  prefecture_id,
  status
from
  company
order by
  company_id
