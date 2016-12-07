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

{{< js_sequence_diagram app_build >}}
participant User
participant Cite
participant GitHub
participant Buildbot
participant DockerReg

User->GitHub: git push
GitHub->Cite: event: push
Cite->Buildbot: start build
Buildbot->GitHub: commit status: pending
GitHub->Cite: event: status(pending)
Cite->User: notify: build start
Buildbot->Buildbot: build docker image
Buildbot->DockerReg: push docker image
Buildbot->GitHub: commit status: success
GitHub->Cite: event: status(success)
Cite->User: notify: build finish
{{< /js_sequence_diagram >}}

1. user pushes source to github
1. github send push event to cite
1. cite trigger buildbot to build docker image
  * `X-GitHub-Event: cite`
1. buildbot start docker build
1. buildbot update commit status to pending
1. github send status/pending event to cite
1. cite send notify : build started
1. buildbot execute docker image build
1. buildbot execute docker image push
1. buildbot update commit status to success or failure
1. github send status/success or status/failure event to cite
1. cite send notify : build finished



## Deployment

{{< js_sequence_diagram app_deploy_auto >}}
participant User
participant Cite
participant GitHub
participant Kubernetes

GitHub->Cite: event: status(success)
Cite->GitHub: deployment
Cite->GitHub: deployment status: pending
GitHub->Cite: event: deployment(pending)
Cite->User: notify: deploy start
Cite->Kubernetes: create replication controller
Cite->Cite: wait for Pods become ready
Cite->Kubernetes: update service selector
Cite->GitHub: deployment status: success
GitHub->Cite: event: deployment(success)
Cite->User: notify: deploy success
{{< /js_sequence_diagram >}}

1. github send status/success event to cite
1. cite send create deployment to github
1. cite send create deployment status/pending to github
1. github send back deployment status to cite
1. cite send notify : deploy started
1. cite create kubernetes replication controller
1. cite polls for all pods to become ready status
1. cite update kubernetes service selector
1. cite send create deployment status/success to github
1. github send back deployment status to cite
1. cite send notify : deploy finished
