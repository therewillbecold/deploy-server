import path from "path";

const homeDir = require('os').homedir;

let config = {
    host_publish: 'assets.oa.com',
    host_test: 'assets-test.oa.com',
    // 线上静态资源根目录
    publishRoot: path.resolve(homeDir + '/code/assets'),
    // test环境静态资源根目录
    testRoot: path.resolve(homeDir + '/code/assets-test'),
    // 缓存文件的根目录
    cacheRoot: path.resolve(homeDir + '/code/assets-caches'),
    // html文件保存根目录, web服务访问的根路径, 如访问 http://abc.com 时可以访问的根目录
    webRoot_publish: path.resolve(homeDir + '/code/webRoot-publish'),
    // html文件保存根目录, web服务访问的根路径, 如访问 http://abc.com 时可以访问的根目录
    webRoot_test: path.resolve(homeDir + '/code/webRoot-test'),
    // logLevels 默认是 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
    log4js: {
        pm2: true,
        appenders: {
            out: { type: 'stdout' }
        },
        categories: { 
            default: { 
                appenders: ['out'], 
                level: 'info' 
            }
        }
    }
}

export default config