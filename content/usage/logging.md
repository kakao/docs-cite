---
date: 2016-08-23T17:27:31+09:00
title: Logging
weight: 32
menu:
  main:
    parent: Usage
    identifier: logging
---

## Raw Log
stdout/stderr를 elasticsearch에 log컬럼으로 저장
![RawLog](/images/usage/raw_log.png)

## Structured Log
stdout/stderr중 '{'로 시작하고 JSON.parse()에 성공하는 로그는 elasticsearch에 log_obj컬럼으로 저장
![StructuredLog](/images/usage/structured_log.png)