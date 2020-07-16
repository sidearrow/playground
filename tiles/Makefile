MIN_ZOOM_LEVEL=8
MAX_ZOOM_LEVEL=12
MBTILES_FILE=./out.mbtiles

geojson-to-tiles:
	tippecanoe -z${MAX_ZOOM_LEVEL} -Z${MIN_ZOOM_LEVEL} -o ${MBTILES_FILE} ${IN}
	tile-join --output-to-directory ${OUT} --no-tile-compression --no-tile-size-limit ${MBTILES_FILE}
	touch ${OUT}/.gitkeep

serve:
	node server.js

deploy:
	firebase deploy --only hosting
