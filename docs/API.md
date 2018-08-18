# API

服务端的接口

## 通用

- status
    - 0: 成功
    - 1: 失败

## 部署

API: /deploy

Method: post

参数:

- request

```json
{
    "project": "shield",
    "path": "dist",
    "repository": "git@git.code.oa.com:data_pd/shield-1.0.git",
    "version": "1.0.0"
}
```

- response

```json
{
    "status": 0,
    "message": ""
}
```
