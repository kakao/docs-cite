---
title: Design
weight: 10
---

## Create
{{< js_sequence_diagram app_create >}}
participant User
participant Cite
participant kubernetes
participant elasticsearch
participant Github

User->Cite: create app
Cite->kubernetes: upsert kubernetes namespace
Cite->elasticsearch: upsert kibana index
Cite->Github: upsert github webhook
Cite->Github: add cite user as collaborator
Cite->kubernetes: upsert kubernetes service
{{< /js_sequence_diagram >}}

1. create new service on cite webUI
1. create/update kubernetes namespace
1. create/update kibana index on elasticsearch for Pod log
1. register cite webhook on github repository
1. add cite account as a collaborator on github repository for source checkout, commit status update, deployment create, deployment status update

## Build

### Automatic

{{< js_sequence_diagram app_build_auto >}}
Title: cite auto build

participant User
participant GitHub
participant Buildbot
participant DockerReg
participant Cite

User->GitHub: git push
GitHub->Buildbot: webhook for push event
Buildbot->GitHub: update commit status : pending
GitHub->Cite: webhook for status event
Cite->User: notification for build start
Buildbot->Buildbot: build docker image
Buildbot->DockerReg: push docker image
Buildbot->GitHub: update commit status : success
GitHub->Cite: webhook for status event
Cite->User: notification for build end
{{< /js_sequence_diagram >}}

1. git push to github
1. github executes webhook : push event 
1. buildbot 이 github 의 commit status 업데이트 : pending
1. github 이 status event 에 대한 webhook (cite API) 요청
1. cite 가 사용자에게 빌드 시작 알림
1. buildbot 이 docker image build
1. buildbot 이 docker registry 로 image push
1. buildbot 이 github 의 commit status 업데이트 : success or failure
1. github 이 status event 에 대한 webhook (cite API) 요청
1. cite 가 사용자에게 빌드 결과(성공 or 실패) 알림

### Manual

{{< js_sequence_diagram app_build_manual >}}
Title: cite manual build

participant User
participant Cite
participant GitHub
participant Buildbot
participant DockerReg

User->Cite: build
Cite->Buildbot: github 'cite' event
Buildbot->GitHub: update commit status : pending
GitHub->Cite: webhook for status event
Cite->User: notification for build start
Buildbot->Buildbot: build docker image
Buildbot->DockerReg: push docker image
Buildbot->GitHub: update commit status : success
GitHub->Cite: webhook for status event
Cite->User: notification for build end
{{< /js_sequence_diagram >}}

1. cite UI 에서 build 또는 rebuild 버튼 클릭
1. cite 가 buildbot 으로 custom github event 전송
  * `X-GitHub-Event: cite`
1. buildbot 이 github 의 commit status 업데이트 : pending
1. github 이 status event 에 대한 webhook (cite API) 요청
1. cite 가 사용자에게 빌드 시작 알림
1. buildbot 이 docker image build
1. buildbot 이 docker registry로 image push
1. buildbot 이 github 의 commit status 업데이트 : success or failure
1. github 이 status event 에 대한 webhook (cite API) 요청
1. cite 가 사용자에게 빌드 결과(성공 or 실패) 알림



## Deployment

### Automatic

{{< js_sequence_diagram app_deploy_auto >}}
Title: cite auto deploy

participant GitHub
participant Cite
participant Kubernetes

GitHub->Cite: github status event : success
Cite->GitHub: create deployment
Cite->GitHub: create deployment status : pending
Cite->Kubernetes: create replication controller
Cite->Kubernetes: update service
Cite->GitHub: create deployment status : success
{{< /js_sequence_diagram >}}

1. github 이 status event 에 대한 webhook (cite API) 요청
1. cite 가 github 에 deployment 생성
1. cite 가 github 에 deployment status 생성 : pending
1. Kubernetes replication controller 생성
1. Kubernetes service의 selector 갱신
1. cite 가 github 에 deployment status 생성 : success



### Manual

{{< js_sequence_diagram app_deploy_manual >}}
Title: cite manual deploy

participant User
participant GitHub
participant Cite
participant Kubernetes

User->Cite: deploy request
Cite->GitHub: create deployment
Cite->GitHub: create deployment status : pending
Cite->Kubernetes: create replication controller
Cite->Kubernetes: update service
Cite->GitHub: create deployment status : success
{{< /js_sequence_diagram >}}

1. cite UI 에서 deploy버튼 클릭
1. cite 가 github 에 deployment 생성
1. cite 가 github 에 deployment status 생성 : pending
1. Kubernetes replication controller 생성
1. Kubernetes service의 selector 갱신
1. cite 가 github 에 deployment status 생성 : success
