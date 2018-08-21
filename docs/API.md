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
    "root": "dist", // 要发布的根目录
    "repository": "git@git.code.oa.com:data_pd/shield-1.0.git", // git仓库路径
    "tag": "publish/1.0.0", // git tag, 添加方式为 git tag publish/1.0.0
    "env": "publish", // 部署的环境, 取值 publish, test
    "htmlPath": ["index/index.html", "product/index.html"] // 项目中的html文件, 路径从上面设置的root出发
}
```

- response

```json
{
    "status": 0,
    "message": "部署成功"
}
```
