#/bin/bash

OUT=../tmp/xyztiles

tile-join --output-to-directory ${OUT} \
  --no-tile-compression --no-tile-size-limit --force ../mbtiles/train_map.mbtiles

rm -f ${OUT}/.gitignore
touch ${OUT}/.gitignore
echo "*" >> ${OUT}/.gitignore
echo "!.gitignore" >> ${OUT}/.gitignore
