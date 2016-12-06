---
date: 2016-08-23T17:02:37+09:00
title: Introduction
type: index
weight: 0
---
## What is CaaS(Container as a Service)?

CaaS__는 컨테이너화(Containerized)된 어플리케이션을 서버에 배포하고 원하는 상태로 유지하는 서비스입니다. 널리 알려진 오픈소스 솔루션으로는 [kubernetes](http://kubernetes.io/), [docker  swarm](https://docs.docker.com/swarm/), [mesos](http://mesos.apache.org/)+[aurora](http://aurora.apache.org/)/[marathon](https://mesosphere.github.io/marathon/) 등이 있으며, 상용 서비스로는 [microsoft azure container service](https://azure.microsoft.com/en-us/services/container-service/), [google container engine](https://cloud.google.com/container-engine/), [Amazon EC2 Container Service](https://aws.amazon.com/ecs/) 등이 있습니다.



## What is Cite?

cite는 google kubernetes기반 CaaS(Container as a Service)입니다. 처음 사용자는 [사용자 문서](usage) 를 참조해주세요.

cite는 [GitHub Flow](https://guides.github.com/introduction/flow/)를 따릅니다.



## Why Cite?

### Fast IT
* 더 빠르게 서비스를 생성/배포/롤백합니다. 가능한 모든 부분을 자동화하여 서비스 생성에서 릴리즈까지 걸리는 시간을 단축합니다.
* 빠르게 확장(horizontal/vertical scaling)할 수 있습니다.

### Efficient IT
* 더 적은 하드웨어로 더 많은 서비스를 수행합니다.
* 서비스 개발자와 SE의 인프라 관리 비용을 줄입니다.




## Network

### IP Address Range (PGX-DEV)
cite가 구동하는 컨테이너는 아래의 IP주소 2560개중 임의의 IP를 사용하며, 향후 추가될 수 있습니다.
```
10.60.240.0/24
10.60.241.0/24
10.60.242.0/24
10.60.243.0/24
10.60.244.0/24
10.60.245.0/24
10.60.246.0/24
10.60.247.0/24
10.60.248.0/24
10.60.249.0/24
```

cite physical node들은 아래의 IP를 사용합니다.
```
10.60.25.139
10.60.25.140
10.60.25.141
10.60.25.142
10.60.25.143
10.60.25.203
10.60.25.204
10.60.25.205
10.60.25.206
10.60.25.207
```
관련 아지트 글 : https://kakao.agit.in/g/300003331/wall/304430092#comment_panel_304431968



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



## Repository
* cite : https://github.daumkakao.com/ctf/cite
* cite-lb : https://github.daumkakao.com/ctf/cite-lb
* cite ansible : https://github.daumkakao.com/ctf/kubernetes-ansible

## Reference
* Kubernetes : http://kubernetes.io
* Kubernetes Github : https://github.com/GoogleCloudPlatform/kubernetes
* Google Container Engine : https://cloud.google.com/container-engine/docs/
