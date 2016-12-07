---
date: 2016-08-23T17:02:37+09:00
title: Go
weight: 31
menu:
  main:
    parent: Usage
    identifier: go
---

## Prepare

1. govendor설치

    ```bash
    go get github.com/kardianos/govendor
    ```

1. vendor 초기화

    ```bash
    govendor init
    ```

1. vendor 디렉토리에 외부 라이브러리 추가
    ```bash
    govendor add +external
    ```



## Dockerfile

```dockerfile
FROM golang:1.6

ENV TZ Asia/Seoul

ADD . /go/src/[리모트 패키지 경로]

WORKDIR /go/src/[리모트 패키지 경로]

RUN go-wrapper download
RUN go-wrapper install

EXPOSE [서버가 사용하는 포트]

CMD ["실행 파일 경로"]
```

### 예제
```dockerfile
FROM golang:1.6

ENV TZ Asia/Seoul

ADD . /go/src/github.daumkakao.com/ctf/cite

WORKDIR /go/src/github.daumkakao.com/ctf/cite

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



## Background

1. vendoring을 통해 라이브러리 업데이트로 인한 버그나 외부 repository의 문제로 인한 빌드 실패를 최소화. govendor외에도 vendoring도구는 뭐든 사용 가능함.
1. glide는 vendor디렉토리 내에 .git파일을 그냥 둬서 git에서 submodule로 관리할 필요가 있으나, cite에서는 vendor라이브러리를 직접 github에 호스팅하는 모델로 생각하고 govendor로 변경.
1. golang에 한정해서 scratch 이미지 기반으로 만드는게 더 효율적이겠지만 대부분의 사용자가 OSX 또는 windows일것을 감안하면 빌드용 docker, 릴리즈용 docker를 따로 관리하기가 더 불편할것으로 예상됨.
  * docker in docker패턴은 향후 needs가 있으면 추가할 예정



## Reference

* govendor : https://github.com/kardianos/govendor
* package management tools : https://github.com/golang/go/wiki/PackageManagementTools
* golang docker guide : https://blog.golang.org/docker
* Building Docker Images for Static Go Binaries : https://medium.com/@kelseyhightower/optimizing-docker-images-for-static-binaries-b5696e26eb07#.a056g91oo
