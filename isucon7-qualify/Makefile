INIT_APP_DIR=./isucon7-qualify/webapp/python

DOCKER_IMAGE_NAME=isucon7-qualify-app

init/build:
	docker-compose -f docker-compose.init.yml build

init/up:
	docker-compose -f docker-compose.init.yml up

init/down:
	docker-compose -f docker-compose.init.yml down

init/start:
	docker-compose -f docker-compose.init.yml start

init/stop:
	docker-compose -f docker-compose.init.yml stop

dev/build:
	docker-compose -f docker-compose.dev.yml build

dev/up:
	docker-compose -f docker-compose.dev.yml up

dev/down:
	docker-compose -f docker-compose.dev.yml down

dev/start:
	docker-compose -f docker-compose.dev.yml start

dev/stop:
	docker-compose -f docker-compose.dev.yml stop

bench/build:
	docker build -t isucon7-qualify-bench ./bench

bench/run:
	docker run --rm --network isucon7-qualify_default -v $(PWD)/result:/result \
		isucon7-qualify-bench bin/bench -remotes isucon7-qualify-web -output /result/result.json

output-stats:
	while true; do docker stats -a --no-stream >> stats.txt; done