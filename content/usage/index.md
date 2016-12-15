---
title: Usage
weight: 30
---

## Create
1. open cite web
1. authorize cite
![Auth](/images/usage/cite_auth.png)
1. create service
![Create](/images/usage/cite_create.png)
![Create Form](/images/usage/cite_create_form.png)
  * GitHub : github repository and branch
  * Service : name of kubernetes service
  * HTTP Ports : http/https service listen port. first port redirects to 80 and 443.
  * Notifications : notification endpoints for build/deploy event.
  * Replicas : number of container instances
  * Auto Deploy : enable auto deploy
  * Environment Variables : container environment variables. lines start with # is ignored.
![Notification](/images/usage/cite_notification_slack.png)

## Service

### Service Metadata
![Service Meta](/images/usage/cite_service_meta.png)

### Service
![Service](/images/usage/cite_service.png)

### GitHub Commits
![Github Commits](/images/usage/github_commits.png)

### GitHub Deployments
![Github Deployments](/images/usage/github_deployments.png)

## Build
![Build](/images/usage/cite_build_1.png)
![Build](/images/usage/cite_build_2.png)

## Monitor
![Monitor](/images/usage/grafana.png)

## Log
![Log](/images/usage/cite_log.png)
