import execa from 'execa'
import fs from 'fs-extra'

const Utils = {    
    log (...args) {
        console.log(args)
    },
    exec (command, options) {
        return execa.shell(command, options)
    },
    isPathExist (path) {
        return fs.pathExistsSync(path)
    },
    getRepoName (path) {
        let repoName = /\/(.+)?\.git$/.exec(path)
        return repoName && repoName[1] || ''
    },
    response:{
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
    }
}

export default Utils