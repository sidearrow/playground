up:
	docker-compose \
		-p file-transfer-sandbox \
		-f docker/ftp.yml \
		up

stop:
	docker-compose \
		-p file-transfer-sandbox \
		-f docker/ftp.yml \
		stop

dev/up:
	docker-compose \
		-p file-transfer-sandbox \
		-f docker/python.yml \
		up

dev/stop:
	docker-compose \
		-p file-transfer-sandbox \
		-f docker/python.yml \
		stop