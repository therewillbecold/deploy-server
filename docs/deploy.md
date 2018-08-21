# deploy

deploy部署的配置项

## 配置文件名

deploy.json

## 结构

```json
{
    "root": "dist", // 要发布的根目录
    "repository": "git@git.code.oa.com:data_pd/shield-1.0.git", // git仓库路径
    "tag": "publish/1.0.0", // git tag, 添加方式为 git tag publish/1.0.0
    "env": "publish" // 部署的环境, 取值 publish, test
}
```

## 部署后静态资源url

test环境覆盖式部署

- 线上: assets.abc.com/my-project/1.0.0/
- test环境: assets-test.abc.com/my-project/
