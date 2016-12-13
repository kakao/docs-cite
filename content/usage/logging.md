---
date: 2016-08-23T17:27:31+09:00
title: Logging
weight: 31
menu:
  main:
    parent: Usage
    identifier: logging
---

## Raw Log
store stdout/stderr into elasticsearch / log as raw string
![RawLog](/images/usage/raw_log.png)

## Structured Log
store stdout/stderr into elasticsearch / log_obj if starts with '{' and succeeds JSON.parse()
![StructuredLog](/images/usage/structured_log.png)
