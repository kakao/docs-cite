---
date: 2016-08-23T18:47:20+09:00
title: FAQ
weight: 60
---

## CITE와 DKOS의 다른점이 뭔가요?

CITE는

* kubernetes기반의 CaaS입니다.

DKOS는

* mesos, marathon provisioning서비스입니다.

Kubernetes는

* google에서 사용해 오던 C기반의 container orchestration도구인 borg를 golang으로 처음부터 다시 만들고 오픈소스화한 것입니다.
* scheduling기능이 포함되어 있습니다.

Mesos는

* 2009년 발표된 apache 오픈소스 프로젝트입니다.
* mesos생태계의 수많은 프레임워크와 솔루션들을 손쉽게 생성하여 사용할 수 있습니다.
* scheduling은 marathon이나 aurora를 사용합니다.

CITE를 이용하면

* 사전에 만들어진 클러스터와 scheduler를 사용합니다.
* 클러스터를 인프라팀에서 관리합니다.

DKOS를 이용하면

* 클러스터를 직접 생성합니다.
* 클러스터를 사용자가 관리합니다.
 


## public service가 가능한가요?

네 가능합니다. public service는 아래의 순서를 따릅니다.

1. cite agit(https://kakao.agit.in/g/300005513) 로 public IP 등록 요청

2. 보안 검수
  * 향후 docker push시 자동으로 보안 검수를 수행할 예정입니다.

3. 공인 VIP 및 도메인 할당

### Cite LB (PG1-DLB01/02) 서비스 공인 VIP 할당 정책
1. 공인 VIP 가 필요한 서비스의 경우 @niko.bellic 가 보안검수 후 @@cec 에게 공인 VIP 구성 요청을 한다. 
2. PG1-DLB01/02 공인 VIP(211.231.111.0/24 ) 대역은 @@cec 에서 직접 관리 한다. (사설 VIP 제외)
3. 기존 사설 VIP 구성과 동일하게 PG1-DLB01/02 공인 VIP 구성을 진행함 (인증서별도) @@cec
4. 서버는 기존 사설 VIP 와 매칭된 ServiceGorup 으로 동일하게 지정 한다. @@cec
5. 공인 VIP 에 Vname 네이밍 룰은 사설 VIP 에 Vname 에서 맨앞에 p 를 붙여 별도로 관리 한다. @@cec
ex) cite_crizin-avi_master-viewgrave_80 -> pcite_crizin-avi_master-viewgrave_80

+ 최종 구성 
- 사설 VIP - ServiceGroup(A)
- 공인 VIP - ServiceGroup(A) 