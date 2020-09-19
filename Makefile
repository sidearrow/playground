start-mbtileserver:
	docker run --rm -p 8888:8000 -v ${PWD}/mbtiles:/tilesets consbio/mbtileserver
