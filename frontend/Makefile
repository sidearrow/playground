run-dev:
	docker-compose up

stop-dev:
	docker-compose down

clean-content:
	rm -rf docker/nginx/shared/latest

copy-content:
	cp -r ../downloader/docker/minio/data/matome-content-dev/latest ./docker/nginx/shared/

deploy:
	firebase deploy --only hosting