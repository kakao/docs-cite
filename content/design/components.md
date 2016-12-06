---
title: Components
weight: 12
menu:
  main:
    parent: Design
    identifier: components
---
## Components

### [cite](https://github.daumkakao.com/CTF/cite)
cite web frontend 및 github의 요청을 처리하는 API 서버. google developer console에 대응

* service metadata 설정
* service 생성/삭제
* pod 상태 조회
* 배포/롤백

### [cite-watcher](https://github.daumkakao.com/CTF/cite-watcher)
kubernetes ingress관련 이벤트 처리.

* domain update

### [cite-batch](https://github.daumkakao.com/CTF/cite-batch)
batch성 작업 모음

* garbage collect : 사용되지 않는 replication controller 삭제



## External Components

### etcd
cite의 main storage. cite configuration, kubernetes metadata, fleet metadata, cite metadata 및 loadbalancer endpoint 관리

### kubernetes
container pod, replication controller, service 등 관리. replication controller가 container instance개수 유지

### elasticsearch + kibana
kubernetes POD의 로그 수집, kubernetes 및 cite 자체 로그 수집

### jenkins
배치 작업 처리

* etcd backup
* elasticsearch cleanup : 오래된 앱 로그 및 배포 로그 삭제
* service health check
* kubernetes node lvs 상태 보고
* cite-batch로 사용되지 않는 replication controller삭제



## Supplement Components

### ansible
* cite 및 kubernetes 설치, 업데이트

### docker-registry
* docker image 호스팅

### fluentd
* pod 및 cite 로그 수집
