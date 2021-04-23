#!/bin/bash

LAYER_NAME_RS=railroad
MIN_ZOOM_LEVEL_RS=5
MAX_ZOOM_LEVEL_RS=15
IN_RS=./geojsons/N05-19_RailroadSection2.geojson
MBTILES_FILE_RS=./mbtiles/N05_19_RailroadSection2.mbtiles

LAYER_NAME_S=station
MIN_ZOOM_LEVEL_S=10
MAX_ZOOM_LEVEL_S=15
IN_S=./geojsons/N05-19_Station2.geojson
MBTILES_FILE_S=./mbtiles/N05_19_Station2.mbtiles

OUT=./tiles/railway

tippecanoe -B 10  -z${MAX_ZOOM_LEVEL_RS} -Z${MIN_ZOOM_LEVEL_RS} -o ${MBTILES_FILE_RS} ${IN_RS} -l ${LAYER_NAME_RS} --base-zoom 10 --force
tippecanoe -B 10  -z${MAX_ZOOM_LEVEL_S} -Z${MIN_ZOOM_LEVEL_S} -o ${MBTILES_FILE_S} ${IN_S} -l ${LAYER_NAME_S} --base-zoom 12 --force

tile-join --output-to-directory ${OUT} --no-tile-compression --no-tile-size-limit --force ${MBTILES_FILE_RS} ${MBTILES_FILE_S}

rm -f ${OUT}/.gitignore
touch ${OUT}/.gitignore
echo "*" >> ${OUT}/.gitignore
echo "!.gitignore" >> ${OUT}/.gitignore
