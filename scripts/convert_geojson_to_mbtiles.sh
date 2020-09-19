#!/bin/bash

tippecanoe -B 10 -z15 -Z5 \
  -o ../mbtiles/line.mbtiles ../geojsons/line.geojson \
  -l line --base-zoom 10 --force

tippecanoe -B 10 -z15 -Z5 \
  -o ../mbtiles/train.mbtiles ../geojsons/train.geojson \
  -l train --base-zoom 10 --force
