#!/bin/bash

ogr2ogr -f GeoJSON ../geojsons/train.geojson \
  PG:"host=localhost port=15432 user=user password=password dbname=express_map" \
  "train(geom)"

ogr2ogr -f GeoJSON ../geojsons/train_station.geojson \
  PG:"host=localhost port=15432 user=user password=password dbname=express_map" \
  "train_station(geom)"

