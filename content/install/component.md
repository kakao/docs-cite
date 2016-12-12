---
title: Component
weight: 21
menu:
  main:
    parent: Install
    identifier: component
---
# fluentd aggregator

# elasticsearch

# kibana

# grafana

# Master

## Configuration

1. edit build.conf. template : https://github.com/kakao/cite-build/blob/master/build.conf.sample
1. create ConfigMap

    ```
    kubectl create configmap buildbot-config --from-file=build.conf
    ```

## Configuration Entries
* github
  * api_url: github api endpoint. https://api.github.com or https://github.example.com/api/v3
  * api_token: cite collaborator user's oauth token. use 8bcd1e531e6b2223599b0a825f19b0e13f89d5b8 for public github
  * base_url: github host. https://github.com or https://github.example.com
* docker
  * registry: custom docker registry domain without protocol prefix. ex) docker-reg.example.com
* buildbot
  * workers: name of buildbot workers
  * worker_instance: number of buildbot instances per worker
  * worker_password: buildbot worker password
  * url: buildbot master url
  * database: buildbot rbdms url. sqlite:///state.sqlite or mysql://[username]:[password]@[mysql_host]/buildbot?max_idle=300

## Start
```
kubectl create -f https://raw.githubusercontent.com/code0x9/citetest/master/cite-build.yaml
```

## Expose
```
kubectl expose -f https://raw.githubusercontent.com/code0x9/citetest/master/cite-build.yaml
```

# Worker
* do not use docker image buildbot/buildbot-worker, because
  * need to execute docker build(docker-in-docker)
  * public network accessability for dependency resolve

## Install

```
pip install -U buildbot-worker
```

## Configure

```
buildbot-worker create-worker worker \
    [cite_build_master_host] \
    [cite_build_worker_name]-[cite_build_instance] \
    [cite_build_worker_password]
```

## Start

```
buildbot-worker start worker
```
