IMAGE_NAME=matome-manager
SRC_DIR=$(CURDIR)/src
LAMBDA_NAME_DEV=matome-manager-dev
LAMBDA_NAME_PROD=matome-manager-prod

download-list-yaml-to-json:
	yq e -j -I 0 download_list.yaml > download_list.json

build-base:
	docker build --tag $(IMAGE_NAME):base --no-cache -f ./Dockerfile.base .

build-dev: build-base
	docker build --tag $(IMAGE_NAME):dev -f ./Dockerfile.dev .

run-dev:
	docker run --rm \
		-v $(SRC_DIR):/var/task/src:ro,delegated \
		$(IMAGE_NAME):dev \
		src.executor.lambda_handler

build-deploy-package: build-base
	docker run -v $(PWD)/deploy:/var/task/deploy $(IMAGE_NAME):base \
	zip -9yr deploy/lambda.zip .

deploy-dev:
	aws lambda update-function-code --function-name $(LAMBDA_NAME_DEV) --zip-file fileb://deploy/lambda.zip

upload-config: config-to-json
	aws s3 cp ./config.json s3://$(S3_BUCKET_NAME)/config.json

start-dev:
	docker-compose up

stop-dev:
	docker-compose down