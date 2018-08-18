require('babel-register');

let Utils = require('./common/utils.js').default
let git = require('./workflow/git').default
let path = require('path')
// require('./server/index.js')
require('./index')


const isExist = Utils.isPathExist(path.resolve(__dirname, '../assets'))
console.log('isExist:', isExist)

const testConf = {
    "root": "dist",
    "repository": "git@git.code.oa.com:data_pd/shield-1.0.git",
    "project": "shield"
}
console.log('getRepoName:', Utils.getRepoName(testConf.repository))
git(testConf)



