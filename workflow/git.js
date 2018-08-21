import SGitP from 'simple-git/promise'
import fs from 'fs-extra'
import config from '../common/conf.js'
import path from 'path'
import Utils from '../common/utils.js'
import deployWebRoot from './deployWebRoot.js'

const { cacheRoot, testRoot, publishRoot, host_publish, host_test } = config
const {getRepoName, log, getVersion} = Utils

/**
 * 更新仓库
 * @param {String} projectDir 项目路径
 */
async function updateRepo (projectDir, tag) {
    log.info('开始从git拉取更新:')
    const git = SGitP(projectDir)
    let resInfo = await git.fetch({'--tags': null})
    log.debug('更新完成:', resInfo)
    log.debug(`检查要发布的tag: ${tag}是否存在:`)
    let listTags = await git.listRemote(['--tags'])
    listTags = listTags.split(/\n/)
    let isTagExit = false
    if (Array.isArray(listTags) && listTags.length > 0) {
        const index = listTags.findIndex(item => item.includes(tag))
        if (index > -1) {
            isTagExit = true
        }
    }
    log.debug(isTagExit)
    if (!isTagExit) {
        throw new Error('git仓库中没有找到要发布的版本')
    }
}

/**
 * 检查项目是否存在, 并拉取最新git信息
 * @param {string} projectDir 项目路径
 * @param {string} repository 项目git仓库地址
 */
async function ensureGitRepo(projectDir, repository) {
    let resInfo = ''
    log.info('确保项目目录存在:', projectDir)
    await fs.ensureDir(projectDir, '0o777')
    const git = SGitP(projectDir)
    log.info('检查是否是git目录:')
    resInfo = await git.checkIsRepo()
    log.info(resInfo)
    if (!resInfo) {
        log.info('文件夹初始化为git目录:')
        await git.init()
        log.debug('add remote repository:')
        await git.addRemote('origin', repository)   
    }
    return '完成项目路径检测'
}
/**
 * 把发布文件夹部署到相应的assets目录
 * @param {String} projectPath 
 * @param {String} targetAssetsPath 
 */
async function copyFileToAssets (cachePath, targetAssetsPath) {
    log.debug(`复制文件${cachePath}到${targetAssetsPath}`)
    await fs.ensureDir(targetAssetsPath, '0o777')
    await fs.remove(targetAssetsPath)
    await fs.copy(cachePath, targetAssetsPath)
}

function getCachePath (repository) {
    const repoName = getRepoName(repository)
    return path.resolve(cacheRoot, repoName)
}

/**
 * 获取项目发布文件路径, 如 /webroot/assets/shield/1.0.0
 * @param {*} repository 项目git仓库地址
 * @param {*} tag 要发布的git标签, 如publish/1.0.0
 * @param {*} env 发布的环境 publish, test
 */
function getProjectTargetPath(repository, tag, env){
    const repoName = getRepoName(repository)
    const targetAssetsRoot = config[env + 'Root']
    const version = getVersion(tag)
    if (env == 'publish') {
        return path.resolve(targetAssetsRoot, repoName, version)
    }
    return path.resolve(targetAssetsRoot, repoName)
}

/**
 * 部署到相应环境
 * @param {*} env 值为 publish, test
 */
async function publish (cachePath, root, env, tag, repository) {  
    // 切到要发布的tag
    const git = SGitP(cachePath)
    await git.checkout(tag)
    // 项目要发布的目录
    const projectRootPath_cache = path.resolve(cachePath, root)
    const projectRootPath_target = getProjectTargetPath(repository, tag, env)
    await copyFileToAssets(projectRootPath_cache, projectRootPath_target)
}

function getAssetsUrl (repository, env, tag) {
    const version = getVersion(tag)
    const repoName = getRepoName(repository)
    const repoUrl = `${config['host_' + env]}/${repoName}`
    if (env === 'publish') {
        return `${repoUrl}/${version}`
    }
    return repoUrl
}

export default async function (param) {
    const { root, repository, env, tag, htmlPath } = param
    if (/\.\./g.test(root)) {
        log.error('root路径中不能包含..')
        throw new Error('root路径中不能包含..');
    }
    const repoName = getRepoName(repository)
    log.info(`正在部署的项目名称是${repoName}`)
    // 确保缓存文件夹中存在项目, 并更新项目到最新版本
    const cachePath = getCachePath(repository) 
    await ensureGitRepo(cachePath, repository)
    await updateRepo(cachePath, tag)
    await publish(cachePath, root, env, tag, repository)
    const assetsUrl = getAssetsUrl(repository, env, tag)
    log.info(`资源部署成功, 访问路径为${assetsUrl}`)
    log.info(`正在更新版本`)
    await deployWebRoot(repository, htmlPath, getVersion(tag), env)
    return '更新成功'
}
