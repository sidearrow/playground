openapi-generate-client-code:
	docker run --rm \
	-v ${PWD}/openapi:/local/openapi \
	openapitools/openapi-generator-cli generate \
	-i /local/openapi/openapi.yaml \
	-g typescript-axios \
	-o /local/openapi/out


start-admin-page:
	docker-compose -f ./docker/docker-compose.yml up admin-page admin-page-nginx db
