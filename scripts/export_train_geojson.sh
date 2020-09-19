#!/bin/bash

ogr2ogr -f GeoJSON ../geojsons/train.geojson \
  PG:"host=localhost port=15432 user=user password=password dbname=express_map" \
  "train(geom)"
