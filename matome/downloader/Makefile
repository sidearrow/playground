IMAGE_NAME=matome-downloader
SRC_DIR=$(CURDIR)/src
LAMBDA_NAME_DEV=matome-manager-dev
LAMBDA_NAME_PROD=matome-downloader

build-image-base:
	docker build --tag $(IMAGE_NAME):base --no-cache -f ./Dockerfile.base .

build-image-dev:
	docker build --tag $(IMAGE_NAME):dev -f ./Dockerfile.dev .

run-dev:
	docker run --rm \
		-v $(SRC_DIR):/var/task/src:ro,delegated \
		$(IMAGE_NAME):dev \
		src.executor.lambda_handler

build-deploy-package: build-image-base
	rm -f deploy/lambda.zip
	docker run -v $(CURDIR)/deploy:/var/task/deploy $(IMAGE_NAME):base \
	zip -9yr deploy/lambda.zip .

deploy-dev:
	aws lambda update-function-code --function-name $(LAMBDA_NAME_DEV) --zip-file fileb://deploy/lambda.zip

update-production:
	aws lambda update-function-code --function-name $(LAMBDA_NAME_PROD) --zip-file fileb://deploy/lambda.zip

upload-sites-csv-production:
	aws s3 cp ./sites.csv s3://matome-private/sites.csv

release-production:
	bash ./release_production.sh

start-dev:
	docker-compose up -d

stop-dev:
	docker-compose down
