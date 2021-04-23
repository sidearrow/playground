start-mbtiles-server:
	docker run --rm -p 8888:8000 -v ${PWD}/mbtiles:/tilesets consbio/mbtileserver
start-geojson-server:
	docker run \
		--name train-map_geojson-server \
		-v ${PWD}/geojsons:/geojsons \
		-e FOLDER=/geojsons \
		-e CORS=true \
		-p 8081:8080 \
		halverneus/static-file-server:latest
