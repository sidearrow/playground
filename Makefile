generate-client:
	docker run --rm \
    -v ${PWD}:/local openapitools/openapi-generator-cli generate \
    -i /local/api/swagger-spec.json \
    -g typescript-fetch \
    -o /local/out


start-admin-page:
	docker-compose -f ./docker/docker-compose.yml up admin-page admin-page-nginx db
