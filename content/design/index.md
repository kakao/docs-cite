---
title: Design
weight: 10
---

## Create
![cite userapp create](/images/sequencediagrams/cite_userapp_create.png)

[edit diagram](http://sequencediagram.org/index.html?initialData=C4S2BsFMAIGMxgVwM6QE4EMAOW5shsJAFDFYZqjzkB2w0AqqmmRVSLfQMIKuUjUMdaAGtEAI3Q1IRZH3adokcBmRVUFWAAt5AjkPoBxMFomkm6ALQA+HkQBceAkWjYsxO5BtjJaabMdELGZ6HykZSGRoGgwAW0jyWBJPG2VVdQI0bUDg9FCQcSEMaBAaABNIAA8PBBtjYFNxR1h8QhgAcxMJaAB3SHEtAHtBkRqiOq6m1zKykpoAM0xoFHRXKNhB8BVxQcxgXbGvazC-COQckNEJcNloZgA3ARIgA)

1. cite UI 에서 신규 서비스 생성 버튼 클릭
1. kubernetes에 namespace 생성
1. elasticsearch에 kibana index 생성 : Pod 로그 조회용
1. github repository에 cite webhook 등록
1. github repository에 cite 계정을 collaborator로 등록
  * cite계정으로 source checkout, commit status update, deployment create, deployment status update 수행
1. ETCD의 /cite/{namespace}/{service} 디렉토리에 기본 metadata 기록
1. ETCD의 /cite/{namespace}/{service}/{branch} 디렉토리에 branch별 metadata 기록



## Build

### Automatic

![cite auto build](/images/sequencediagrams/cite_auto_build.png)

[edit diagram](http://sequencediagram.org/index.html?initialData=C4S2BsFMAIGMxgQwK7APbQEbJOAJgFAEAOiATqPKQHbDQCqAzpGSeZSDXQOJgASyTGwogqiWtABCOfJjTBhHLtAAiaWAGsWAJUgBzRaM7i6AYQREmLALQA+XsAGYAXND1hoxZIwAWBB0520rh4csCuAO6QmD5oaBrQAGZoZJ7ePtCQAG6QtATBsvJ2AYKuyMR4iMAwsGgAtnUejMBV3tCuxLl4INQGJZh25tWR0bHxSSnQza2MmTl5Q5B2VmSu1PIgiaJVIGjUE6nYIVMtFPkyoUW2BZfhWBfQeOpaqSB1iHqQ5yFhdmqaOn0HXSj2eLGgbw+Xxuv3s-FK0HKlWqcHqjTo02AbVcjGQsFgkEYjH88IGtkWIxicQSyVSmLa2VyCkWy2Yq2g61AW1gOz2B3uxy6BCAA)

1. 사용자가 github에 push
1. github 이 push event 에 대한 webhook (buildbot API) 요청
1. buildbot 이 github 의 commit status 업데이트 : pending
1. github 이 status event 에 대한 webhook (cite API) 요청
1. cite 가 사용자에게 빌드 시작 알림
1. buildbot 이 docker image build
1. buildbot 이 docker registry 로 image push
1. buildbot 이 github 의 commit status 업데이트 : success or failure
1. github 이 status event 에 대한 webhook (cite API) 요청
1. cite 가 사용자에게 빌드 결과(성공 or 실패) 알림

### Manual

![cite manual build](/images/sequencediagrams/cite_manual_build.png)

[edit diagram](http://sequencediagram.org/index.html?initialData=C4S2BsFMAIGMxgWwIYDsCuzzQEbpOACYBQxADsgE6jwWrDQCqAzpJeVTSHQwMIIdqIWmgYBxMAAl0OQVx7QAQviI4A9sDnDuo6ABE1sANZsASpADmpFmwC0APn7BIALlwqSTyA+UFC64DcLMAALGWgAcnhnCOhIADdIemJfVQ0HCWBpHDd0MkJkZzg1REQwaGZgQvRmaDcyJMIQVCtM7IcvNwB3SBwQtTUjaAAzNUoKquAauMTkrwcbSjdUDRBh4UKQNVQRsfc-Cc4UjwCfE403PAPCQxNxkBQLSGO-U-sDYzNLepqQ6BvPvdHs9Uv50vY2jJcvlCjBYCUygxKtVam5mOhYLBIMxmMRITgOghur1+oNduNkVNagkkpp5vZFstVutYJttuT9kQ4qgSEA)

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
![cite auto deploy](/images/sequencediagrams/cite_auto_deploy.png)

[edit diagram](http://sequencediagram.org/index.html?initialData=C4S2BsFMAIGMxgQwK7APbQCaQA7jQJ4BQROiATqPGQHbDQDiYAEsgEakVUi30DCCTpRDVEdaAGl2kcjUjBIAZxJNgrNgFoAfAIUAuaAHMwAC3bRFwRMGSLokAG6RxBxcliwly3ZG2r1BrDkkNYw2HiEALbOwEQ+fizsgcGhWLj4BNHilta20AY4zpggNIZxCNpSbDJyCorJIQrQwXgi1iBoNHCdwORo4FDk5QqV0rLySgbIOJipijIOIpDDvlr+SXApTeEZWfQ5Nnau7p6KykA)

1. github 이 status event 에 대한 webhook (cite API) 요청
1. cite 가 github 에 deployment 생성
1. cite 가 github 에 deployment status 생성 : pending
1. Kubernetes replication controller 생성
1. Kubernetes service의 selector 갱신
1. cite 가 github 에 deployment status 생성 : success



### Manual
![cite manual deploy](/images/sequencediagrams/cite_manual_deploy.png)

[edit diagram](http://sequencediagram.org/index.html?initialData=C4S2BsFMAIGMxgWwIYDsCuzzQCaQA7gD2AngFBn7IBOo8Vqw0AqgM6TWU10gNMDiYABLoARl1oh6aJgGEEEnn2gBpMR1SRgkVhTYcAtAD552gFy4CxEtGqQAjuh3AypyMcHARoi7DvJtS0JSREhGVwQPYTFff0C8YJJQxmhWYAD0VmgLfDCcEFQAcwjtYzVRDS0dWMgAmDtCKQCQIlQ4VuBqInAoTjcy9WpNbVYLdHwcOtSOADcpSBL3I09vGqmE62SmNIysi1Z0WFgdXSA)

1. cite UI 에서 deploy버튼 클릭
1. cite 가 github 에 deployment 생성
1. cite 가 github 에 deployment status 생성 : pending
1. Kubernetes replication controller 생성
1. Kubernetes service의 selector 갱신
1. cite 가 github 에 deployment status 생성 : success
