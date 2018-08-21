/**
 * 更新web root 目录下的html文件
 */

import fs from 'fs-extra'
import config from '../common/conf.js'
import path from 'path'
import Utils from '../common/utils.js'

const {getRepoName, log} = Utils

function getWebPath (repository, env) {
    const repoName = getRepoName(repository)
    return path.resolve(config['webRoot_' + env], repoName)
}

function getAssetsPath (repository, env, version) {
    const repoName = getRepoName(repository)
    if (env == 'publish') {
        return path.resolve(config[`${env}Root`], repoName, version)
    } else {
        return path.resolve(config[`${env}Root`], repoName)
    }
}

export default async function (repository, htmlPathArr, version, env) {
    const webPath = getWebPath(repository, env)
    const assetsPath = getAssetsPath(repository, env, version) 
    const deployJobs = htmlPathArr.map(item => {
        const dest = path.resolve(webPath, item)
        const src = path.resolve(assetsPath, item)
        log.debug(`从${src}复制文件到${dest}`)
        return fs.ensureFile(dest).then(res => fs.copyFile(src, dest))
    })
    await Promise.all(deployJobs)
}