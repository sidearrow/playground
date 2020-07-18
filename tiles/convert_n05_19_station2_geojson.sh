#!/bin/bash

MIN_ZOOM_LEVEL=6
MAX_ZOOM_LEVEL=15
MBTILES_FILE=n05_19_station2.mbtiles
IN=./geojsons/N05-19_Station2.geojson
OUT=./tiles/railway

tippecanoe -z${MAX_ZOOM_LEVEL} -Z${MIN_ZOOM_LEVEL} -o ./mbtiles/${MBTILES_FILE} ${IN} --force
tile-join --output-to-directory ${OUT} --no-tile-compression --no-tile-size-limit ./mbtiles/${MBTILES_FILE} --force

touch ${OUT}/.gitignore
echo "*" >> ${OUT}/.gitignore
echo "!.gitignore" >> ${OUT}/.gitignore
