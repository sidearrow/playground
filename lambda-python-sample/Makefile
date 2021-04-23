IMAGE_NAME=lambda-python-sample
SRC_DIR=$(CURDIR)/src

build-base:
	docker build --tag $(IMAGE_NAME):base -f ./Dockerfile.base .

build-dev: build-base
	docker build --tag $(IMAGE_NAME):dev -f ./Dockerfile.dev .

run-dev:
	docker run --rm \
		-v $(SRC_DIR):/var/task/src:ro,delegated \
		$(IMAGE_NAME):dev \
		src.lambda_python_sample.lambda_handler

build-deploy-package:
	docker run -v $(PWD)/deploy:/var/task/deploy $(IMAGE_NAME):base \
	zip -9yr deploy/lambda.zip .
