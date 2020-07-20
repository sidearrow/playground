#!/bin/bash

LAYER_NAME=railroad
MIN_ZOOM_LEVEL_RS=6
MAX_ZOOM_LEVEL_RS=15
IN_RS=./geojsons/N02-19_RailroadSection.geojson
MBTILES_FILE_RS=./mbtiles/N02_19_RailroadSection.mbtiles

LAYER_NAME=station
MIN_ZOOM_LEVEL_S=6
MAX_ZOOM_LEVEL_S=15
IN_S=./geojsons/N02-19_Station.geojson
MBTILES_FILE_S=./mbtiles/N02_19_Station.mbtiles

OUT=./tiles/railway

tippecanoe -B 10  -z${MAX_ZOOM_LEVEL_RS} -Z${MIN_ZOOM_LEVEL_RS} -o ${MBTILES_FILE_RS} ${IN_RS} -l ${LAYER_NAME} --force
tippecanoe -B 10  -z${MAX_ZOOM_LEVEL_S} -Z${MIN_ZOOM_LEVEL_S} -o ${MBTILES_FILE_S} ${IN_S} -l ${LAYER_NAME} --force

tile-join --output-to-directory ${OUT} --no-tile-compression --no-tile-size-limit --force ${MBTILES_FILE_RS} ${MBTILES_FILE_S}

rm -f ${OUT}/.gitignore
touch ${OUT}/.gitignore
echo "*" >> ${OUT}/.gitignore
echo "!.gitignore" >> ${OUT}/.gitignore
