require('babel-register');

let path = require('path')
let Utils = require('./common/utils.js').default
let git = require('./workflow/git').default
// require('./server/index.js')

const {
    isPathExist,
    log,
    getRepoName
} = Utils

log.info('Utils测试 ===== Utils测试')

const isExist = isPathExist(path.resolve(__dirname, '../assets'))
log.debug('isExist:', isExist)

// const testConf = {
//     "root": "dist",
//     "repository": "git@git.code.oa.com:data_pd/shield-1.0.git",
//     "project": "shield"
// }

const testConf = {
    root: 'dist',
    repository: 'git@github.com:xu3927/deloy-repo-test.git',
    project: 'deploy-repo-test'
}

log.debug('getRepoName:', getRepoName(testConf.repository))

log.info('git模块测试 ===== git模块测试')

git(testConf)
.then(res => {
    log.debug('git模块测试成功:', res)
})
.catch(err => {
    log.error('git模块测试-error:', err)
})





