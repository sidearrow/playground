```sh
# send files to container
$ docker cp <filename> <container name>:<path>

# entrt in container
$ docker exec -it <container name> bash

# import to postgis
$ shp2pgsql -W cp932 <shp filepath> <tablename> | psql -d <database> -U <user>
```
