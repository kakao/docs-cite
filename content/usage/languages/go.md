---
date: 2016-08-23T17:02:37+09:00
title: Example
weight: 32
menu:
  main:
    parent: Usage
    identifier: example
---

## Prepare

1. install govendor

    ```bash
    go get github.com/kardianos/govendor
    ```

1. initialize vendor

    ```bash
    govendor init
    ```

1. add external dependencies into vendor directory
    ```bash
    govendor add +external
    ```



## Dockerfile

```dockerfile
FROM golang:1.6

ENV TZ Asia/Seoul

ADD . /go/src/[path to remote package]

WORKDIR /go/src/[path to remote package]

RUN go-wrapper download
RUN go-wrapper install

EXPOSE [port to expose]

CMD ["path to executable"]
```

### Sample
```dockerfile
FROM golang:1.6

ENV TZ Asia/Seoul

ADD . /go/src/github.com/kakao/cite

WORKDIR /go/src/github.com/kakao/cite

RUN go-wrapper download
RUN go-wrapper install

EXPOSE 8080

CMD ["/go/bin/cite"]
```


## .dockerignore

```
.git
lastupdate.tmp
```
