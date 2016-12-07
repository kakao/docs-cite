---
date: 2016-08-23T18:47:19+09:00
title: Administration
weight: 50
---

## kubernetes-ansible
* source : https://github.daumkakao.com/ctf/kubernetes-ansible
* branch : develop

### Inventory
* alpha : https://github.daumkakao.com/ctf/kubernetes-ansible/blob/develop/hosts-alpha
* pgx : https://github.daumkakao.com/ctf/kubernetes-ansible/blob/develop/hosts-pgx

### 준비
* openstack 환경변수 설정
  * 사용자가 cite 테넌트에 admin 권한으로 등록되어 있어야 함 
    
    ```
    export OS_REGION_NAME=busan-v1
    export OS_PROJECT_NAME=cite
    export OS_USERNAME=[username]
    export OS_PASSWORD=[password]
    export OS_AUTH_URL=https://krane-api.9rum.cc:5000/v2.0/
    export OS_SERVICE_ENDPOINT=https://krane-api.9rum.cc:35357/v2.0
    ```

### Install
* VM 생성

    ```
    ansible-playbook -i [hosts파일] create_vm.yml
    ```

* 설치

    ```
    ansible-playbook -i [hosts파일] setup.yml
    ```

* VM 삭제

    ```
    ansible-playbook -i [hosts파일] delete_vm.sh
    ```



## elasticsearch
```
curl -XPUT http://elasticsearch.d.9rum.cc:9200/_template/cite_template -d '
{
   "template": "*",
   "mappings": {
      "_default_": {
         "dynamic_templates": [
            {
               "log_obj": {
                  "path_match": "log_obj.*",
                  "match_mapping_type": "string",
                  "mapping": {
                     "type": "string",
                     "index": "not_analyzed"
                  }
               }
            },
            {
               "kubernetes": {
                  "path_match": "kubernetes.*",
                  "match_mapping_type": "string",
                  "mapping": {
                     "type": "string",
                     "index": "not_analyzed"
                  }
               }
            }
         ]
      }
   }
}
'
```



## jenkins
1. jdk 설치

    ```
    yum install -y http://repo.krane.iwilab.com/daum.kakao/jdk/jdk-8u65-linux-x64.rpm
    ```
1. jenkins 설치

    ```
    wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
    rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
    yum install jenkins
    service jenkins restart
    ```
1. port forward

    ```
    iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080
    ```



## kube-nodes 증설
hosts 파일에 신규 노드 추가, ansible-playbook구동

* IP대역이 바뀌는 경우
  * 사내정보시스템 파트 아지트에 IP 추가요청(참조 : https://kakao.agit.in/g/300000555/wall/304215671)
  * 전사 proxy 업무 요청 아지트에 IP 추가요청(참조 : https://kakao.agit.in/g/300003863/wall/303873709)

## kube-nodes 제거
1. kubernetes에서 노드 제거 준비

    ```
    kubectl drain
    ```

1. 노드 제거
