#!/bin/bash

CONTAINER_NAME=express-map-postgis

docker exec ${CONTAINER_NAME} pg_dump -U user -n public express_map > /tmp/postgis_dump.sql
docker cp ${CONTAINER_NAME}:/tmp/postgis_dump.sql ../postgis_dump.sql

tar -zcvf ../postgis_dump.sql.tar.gz ../postgis_dump.sql
rm -rf ../postgis_dump.sql
