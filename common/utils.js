import fs from 'fs-extra'
import log4js from "log4js";
import conf from "./conf";
import isAdmin  from 'is-admin'

log4js.configure(conf.log4js);
const logger  = log4js.getLogger()

// Log Level 级别顺序 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'dev') {
    logger.level = 'debug'
}

const Utils = {    
    log: logger,
    exec (command, options) {
        return execa.shell(command, options)
    },
    testPath() {
        let reg = /[]/
    },
    isPathExist (path) {
        return fs.pathExistsSync(path)
    },
    getRepoName (path) {
        let repoName = /([^\/\\]+?)\.git$/.exec(path)
        if (!repoName) {
            throw new Error(`请检查仓库路径${path}, 路径中不能包含特殊字符`)
        }
        repoName = repoName && repoName[1] || '';
        repoName = repoName.replace(/[\s\.\\\?\:\,\@\#\$\&\(\)\|\;\"\'\<\>\/\~\+\=\[\]\{\}]/g, '-')
        return repoName
    },
    getVersion (tag) {
        let versionRes = /\/(.+)?$/.exec(tag)
        return versionRes && versionRes[1] || ''
    },
    response: {
        success(body) {
            body = body || {}
            return Object.assign({}, {
                status: 0,
                data: null,
                message: 'Sucesss'
            }, body)
        },
        error(body) {
            body = body || {}
            return Object.assign({}, {
                status: 1,
                data: null,
                message: 'Error'
            }, body)
        },
        unauthorized(body){
            body = body || {}
            return Object.assign({}, {
                status: 401,
                data: null,
                message: 'Unauthorized'
            }, body)
        },
        notFound (body) {
            body = body || {}
            return Object.assign({}, {
                status: 404,
                data: null,
                message: 'Not Found'
            }, body)
        }
    },
    isWin(){
        return process.platform == 'win32'
    },
    isAdmin () {
        return isAdmin()
    },
    isSafePath(rootPath, targetPath){
        return /^\.\.\//.test(path.relative(rootPath, targetPath))
    },
    async copyFile (src, dest) {
        logger.debug(`复制文件${src}到${dest}`)
        return fs.copy(src, dest)
    }
}

export default Utils