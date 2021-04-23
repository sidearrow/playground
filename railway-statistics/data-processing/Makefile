dump-no-data:
	mysqldump --user=root --password=root --host=127.0.0.1 --port=33060 -d railway_statistics > ./dump/dump.no-data.`date "+%Y%m%d%H%M%S"`.sql

dump-with-data:
	mysqldump --user=root --password=root --host=127.0.0.1 --port=33060 railway_statistics > ./dump/dump.with-data.`date "+%Y%m%d%H%M%S"`.sql
