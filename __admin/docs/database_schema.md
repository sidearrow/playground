# データベース定義

## company
| column name        | type           | null | pkey |
|--------------------|----------------|:----:|:----:|
| company_id         | int            |      | o    |
| company_code       | varchar(255)   |      |      |
| company_name       | varchar(255)   |      |      |
| company_name_alias | varchar(255)   |      |      |
| company_type_id    | int            |      |      |
| length             | float          |      |      |
| line_num           | int            |      |      |
| station_num        | int            |      |      |
| prefecture_id      | int            |      |      |
| status             | int            |      |      |

## company_name_hist
| column name          | type           | null | pkey |
|----------------------|----------------|:----:|:----:|
| company_name_hist_id | int            |      | o    |
| company_id           | int            |      |      |
| company_name         | varchar(255)   |      |      |
| start_date           | date           |      |      |
| end_date             | date           |      |      |

## company_type_id
| column name          | type           | null | pkey |
|----------------------|----------------|:----:|:----:|
| company_type_id      | int            |      | o    |
| company_type_code    | varchar(255)   |      |      |
| company_type_name    | varchar(255)   |      |      |
