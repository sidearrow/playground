#!/bin/bash

if [ "${1}" = "line" ]; then
  tippecanoe -B 10 -z15 -Z5 \
    -o ../mbtiles/line.mbtiles ../geojsons/line.geojson \
    -l line --base-zoom 10 --force
  exit 0
fi

if [ "${1}" = "train" ]; then
  tippecanoe -z15 -Z5 \
    -o ../mbtiles/train.mbtiles ../geojsons/train.geojson \
    -l train --force
  exit 0
fi

if [ "${1}" = "train_station" ]; then
  tippecanoe -z15 -Z5 \
    -o ../mbtiles/train_station.mbtiles ../geojsons/train_station.geojson \
    -l train_station --force
  exit 0
fi

echo "line | train | train_station"
exit 1
