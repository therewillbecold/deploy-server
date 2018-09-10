import Router from 'koa-router'
import utils from '../../common/utils'
import gitWorkFlow from '../../workflow/git'

let router = new Router();
const {log} = utils

function msg(obj) {
    if (typeof obj == 'string') {
        obj = {
            message: obj
        }
    }
    return JSON.stringify(Object.assign({}, {
        status: 0,
        data: null,
        message: 'success'
    }, obj))
}

const codeEnum = {
    Normal_Closure: 1000
}

router.all('/ws/deploy', ctx => {
    ctx.websocket.send(msg({
        status: 0,
        message: 'connect'
    }))
    ctx.websocket.on('message', message => {
        if (message == 'close') {
            ctx.websocket.close(codeEnum.Normal_Closure, msg({
                status: 0,
                message: 'close'
            }))
            return;
        }
        let params = {}
        try {
            params = JSON.parse(message)
        } catch (err) {};

        if (params && params.version) {
            gitWorkFlow(params, logMsg => {
                ctx.websocket.send(msg(logMsg))
            })
            .then(res => {
                log.info('git任务流执行成功:', res)
                ctx.websocket.send(msg({
                    status: 0,
                    data: {
                        state: 'fulfilled'
                    },
                    message: '更新成功'
                }))
            })
            .catch(err => {
                log.error('git任务流执行错误:', err)
                ctx.websocket.send(msg({
                    status: 1,
                    message: err.toString()
                }))
            })
        }
    })
})


export default router.routes()