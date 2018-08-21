require('babel-register');

let path = require('path')
let Utils = require('./common/utils.js').default
let git = require('./workflow/git.js').default
// require('./server/index.js')


const {
    isPathExist,
    log,
    getRepoName,
    copyFile
} = Utils



// log.info('Utils测试 ===== Utils测试')

// const isExist = isPathExist(path.resolve(__dirname, '../assets'))
// log.debug('isExist:', isExist)

// copyFile('/Users/zhichaoxu/code/assets/deloy-repo-test/1.0.0/product/index.html', '/Users/zhichaoxu/code/assets-web/deloy-repo-test/xixi')


const testParams_publish = {
    root: 'dist', // 项目根目录
    repository: 'http://git.code.oa.com/scene-components/test.git',
    env: 'publish',
    tag: 'publish/1.0.0',
    htmlPath: ['index.html', 'product/index.html'] // 会从设置的root目录开始识别
}

const testParams_test = {
    root: 'dist', // 项目根目录
    repository: 'http://git.code.oa.com/scene-components/test.git',
    env: 'test',
    htmlPath: ['index.html', 'product/index.html'],
    tag: 'test/1.0.3'
}

// log.debug('getRepoName:', getRepoName(testParams_publish.repository))

log.info('git模块测试 ===== git模块测试')

git(testParams_test)
.then(res => {
    log.debug('git模块测试成功:', res)
})
.catch(err => {
    log.error('git模块测试-error:', err)
})

// log.info('test环境deploy ===== test环境deploy')

// git(testParams_test)
// .then(res => {
//     log.debug('git模块测试成功:', res)
// })
// .catch(err => {
//     log.error('git模块测试-error:', err)
// })





