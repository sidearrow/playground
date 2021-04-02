FROM golang:1.9 AS build

ADD ./isucon7-qualify/bench /bench
WORKDIR /bench

RUN go get github.com/constabulary/gb/...
RUN gb vendor restore && \
    make && \
    bin/gen-initial-dataset

FROM mysql:5.7

ENV MYSQL_ALLOW_EMPTY_PASSWORD=1 \
    MYSQL_DATABASE=isubata \
    MYSQL_USER=isucon \
    MYSQL_PASSWORD=isucon

ARG INIT_DIR=/docker-entrypoint-initdb.d
ADD ./isucon7-qualify/db/isubata.sql ${INIT_DIR}/1.sql
COPY --from=build /bench/isucon7q-initial-dataset.sql.gz ${INIT_DIR}/2.sql.gz

CMD ["--character-set-server=utf8mb4"]