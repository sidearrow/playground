FROM golang:1.9

ADD ./isucon7-qualify/bench /bench
WORKDIR /bench

RUN go get github.com/constabulary/gb/...
RUN gb vendor restore && make
