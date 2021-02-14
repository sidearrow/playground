run-api-server:
	docker run --rm --name matome-frontend-api-server -p 9999:80 \
		-v $(CURDIR)/api-server-content:/usr/share/nginx/html:ro -d nginx:1.19.6

stop-api-server:
	docker stop matome-frontend-api-server