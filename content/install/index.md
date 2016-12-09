---
title: Install
weight: 20
---

## Prerequisites

* running kubernetes cluster

## Cite Build

### Configuration

1. edit build.conf
  1. download https://github.com/kakao/cite-build/blob/master/build.conf.sample
  1. edit as needed.
1. create ConfigMap
    ```
    kubectl create configmap buildbot-config --from-file=build.conf
    ```

### Start Master
```
kubectl create -f https://raw.githubusercontent.com/code0x9/citetest/master/cite-build.yaml
```

### Expose Master
```
kubectl expose -f https://raw.githubusercontent.com/code0x9/citetest/master/cite-build.yaml
```

### Start Workers
TODO

## Cite

### Configuration

### Start
```
kubectl create -f https://raw.githubusercontent.com/code0x9/helloworld/master/cite.yaml
```
