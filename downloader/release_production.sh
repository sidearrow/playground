#/bin/bash

FUNCTION_NAME=matome-downloader
ALIAS_NAME=PRODUCTION

PUBLISH_VERSION_RES=`aws lambda publish-version --function-name ${FUNCTION_NAME}`
VERSION=`echo ${PUBLISH_VERSION_RES} | jq -r .Version`

aws lambda update-alias --function-name ${FUNCTION_NAME} --name ${ALIAS_NAME} --function-version ${VERSION}