start-dev:
	docker-compose up -d

stop-dev:
	docker-compose down

clean-content:
	rm -rf docker/nginx/shared/latest

copy-content:
	rm -rf ./docker/nginx/shared/latest
	cp -r ../downloader/docker/minio/data/matome-public-local/latest ./docker/nginx/shared/

deploy:
	firebase deploy --only hosting