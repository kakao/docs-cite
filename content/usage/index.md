---
date: 2016-08-23T17:27:31+09:00
title: Usage
weight: 20
---

## Prerequisites

* Dockerfile : 서비스 repository의 root directory에 위치.
  * base image는 docker-alpine(http://gliderlabs.viewdocs.io/docker-alpine/) 권장



## GUI: cite

### 생성
1. cite web(http://cite.d.9rum.cc/) 접속
1. 최초 접속시 cite 권한 부여
![Auth](/images/usage/cite_auth.png)
1. 서비스 생성
![Create](/images/usage/cite_create.png)
![Create Form](/images/usage/cite_create_form.png)
  * GitHub : github 프로젝트 위치, 브랜치
  * Service : 서비스명. 서비스 생성시 서비스명으로 도메인 생성
  * HTTP Ports : container의 http/https서비스 listen port. 첫번째 포트는 80으로 redirect됨
  * Watchcenter : 빌드/배포 이벤트를 받을 watchcenter group id
  * Replicas : container 인스턴스 개수
  * Auto Deploy : 자동 배포 On/Off
  * Environment Variables : 구동시 환경변수. #으로 시작하는 줄은 주석으로 무시됨



## 서비스
1. GitHub Commits 목록 중 배포할 버전 옆의 Deploy버튼 클릭. 빌드되어 있지 않은 경우 Build버튼 클릭
![Service](/images/usage/cite_service.png)
1. buildbot에서 빌드 로그 조회 및 필요시 다시 빌드 수행
![Build](/images/usage/cite_build_1.png)
![Build](/images/usage/cite_build_2.png)
1. kibana에서 배포 로그 및 런타임 로그 조회
![Deploy](/images/usage/cite_deploy.png)
1. 배포에 성공하면 Deploy버튼이 Redeploy버튼으로 변경됨
  1. 환경변수 갱신 또는 replica 개수 변경시 재배포 목적




## 모니터링
influxDB의 clustering기능이 오픈소스 버전에서 제외됨에 따라(https://influxdata.com/blog/update-on-influxdb-clustering-high-availability-and-monetization/) 별도의 Time Based Database도입 예정

<!--
![Monitor](/images/usage/cite_log_metric.png)
* 로그 : ElasticSearch기반. 24시간 유지
![Log](/images/usage/cite_log.png)
* 상태 : InfluxDB기반.
![Metric](/images/usage/cite_metric.png)
-->



## CLI: kubectl

1. kubectl설치
    
    ```
    brew update
    brew install kubernetes-cli
    ```

1. citeui(http://cite.d.9rum.cc/) 에서 프로젝트 생성
1. 클러스터, 컨텍스트, 인증 토큰 설정

    ```
    kubectl config set-cluster cite-alpha-cluster --server=http://k8s.d.9rum.cc:8080
    kubectl config set-context cite-alpha-context --cluster=cite-alpha-cluster --namespace=default --user=niko-bellic
    kubectl config use-context cite-alpha-context
    kubectl config set-credentials niko-bellic --token=XXXXXX
    ```
    
  * http://cite.d.9rum.cc/settings/profile 참조
1. kubectl로 인스턴스 제어
  * 인스턴스 개수 조절

    ```  
    kubectl scale --replicas={NUM} replicationcontrollers {replicationcontrollers name}
    ```    
