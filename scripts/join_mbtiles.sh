#!/bin/bash

MBTILES_DIR=../tmp/mbtiles

tile-join -f -o ${MBTILES_DIR}/train_map.mbtiles \
  ${MBTILES_DIR}/line.mbtiles \
  ${MBTILES_DIR}/train.mbtiles \
  ${MBTILES_DIR}/train_station.mbtiles
