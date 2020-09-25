#!/bin/bash

MBTILES_DIR=../tmp/mbtiles
GEOJSON_DIR=../tmp/geojson

tippecanoe -B 10 -z15 -Z5 \
  -o ${MBTILES_DIR}/line.mbtiles ${GEOJSON_DIR}/line.geojson \
  -l line --base-zoom 10 --force
