---
title: Cite
weight: 23
menu:
  main:
    parent: Install
    identifier: cite
---
## Configuration

1. edit cite.yaml. template : https://github.com/kakao/cite/blob/master/cite.yaml.sample
1. create ConfigMap

    ```
    kubectl create configmap cite-config --from-file=cite.yaml
    ```

## Configuration Entries
* Cite
  * Host : cite main url. ex) http://cite.example.com
  * ListenPort : cite listening port.default to 8080
  * RCRetentionDuration : time to retain unused Replication Controllers. default to 1 hour(1h)
  * Version: cite version string
* Aggregator
  * Host: fluentd aggregator hostname. ex) aggregator.example.com 
* Buildbot:
  * Webhook: buildboot change_hook url. ex) http://buildbot.example.com:8010/change_hook/github
* LoadBalancer
  * Driver: loadbalancer provider. default to netscaler
* ElasticSearch
  * Host: elasticsearch host. ex) http://elasticsearch.example.com:9200
  * KibanaHost: kibana domain. ex) http://kibana.example.com
* GitHub
  * AccessToken: cite collaborator user's oauth token. use 8bcd1e531e6b2223599b0a825f19b0e13f89d5b8 for public github 
  * API: github api endpoint. https://api.github.com or https://github.example.com/api/v3
  * ClientID: cite github client id
  * ClientSecret: cite github client secret
  * Host: github host. https://github.com or https://github.example.com
  * OAuthAuthURL: github oauth authorize url. https://github.com/login/oauth/authorize or https://github.example.com/login/oauth/authorize 
  * OAuthTokenURL: github oauth token exchange url. https://github.com/login/oauth/access_token or https://github.example. com/login/oauth/access_token
  * Scope: oauth permissions. default to repo,write:repo_hook
  * Username: collaborator userid. use cite-github for public github
  * WebhookURI: github webhook url. default to /v1/github
* Grafana
  * Host: grafana host. ex) http://grafana.example.com
* Kubernetes
  * Master: kubernetes master endpoint. ex) http://k8s.example.com:8080
  * MaxPods: max number of pods per service. default to 20
  * MinInitialDelay: minimum initial delay to wait for pod startup. default to 10
  * MaxInitialDelay: maximum initial delay to wait for pod startup. default to 600
  * PollInterval: health check interval. default to 2
  * PollTimeout: maximum time to wait for pod startup. default to 600
  * DefaultCPU: initial pod cpu limit. default to 250m
  * DefaultMemory: initial pod memory limit. default to 1Gi
  * MaxCPU: maximum pod cpu limit. default to 2000m
  * MaxMemory: maximum pod cpu limit. default to 8Gi
* Notification
  * Slack
    * ClientID: slack client id.
    * ClientSecret: slack client secret.
    * RedirectURI: slack webhook url. default to /v1/notification/slack

### Start
```
kubectl create -f https://raw.githubusercontent.com/code0x9/helloworld/master/cite.yaml
```
