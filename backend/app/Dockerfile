FROM golang:1.14.0

WORKDIR /go/app

ENV GOPATH /go

COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go get -v \
  github.com/codegangsta/gin \
  golang.org/x/tools/gopls
