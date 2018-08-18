import SGitP from 'simple-git/promise'
import SGit from 'simple-git'
import fs from 'fs-extra'
import config from '../common/conf.js'
import path from 'path'
import Utils from '../common/utils'

const { cacheRoot, testRoot, publishRoot } = config

async function ensureGitRepo(projectDir, repository) {
    fs.ensureDirSync(projectDir)
    console.log('ensureDirSync')
    const git = SGitP(projectDir)
    const isRepo = await git.checkIsRepo()
    console.log('isRepo:', isRepo)
    const initRes = await git.init().addRemote('origin', repository)
    console.log('initRes:', initRes)
    return
    if (!isRepo) {
        const initRes = await git.init().addRemote('origin', repository)
        console.log('initRes:', initRes)
    }

    // return new Promise((resolve, reject) => {
    //     const git = SGitP(projectDir)
    //     git
    //     .checkIsRepo()
    //     .then((err, isRepo) => {
    //         console.log('')
    //         if (!isRepo) {
    //             git
    //             .init()
    //             .then((res) => {
    //                 console.log('res: ')
    //                 if (!err) {
    //                     git.addRemote('origin', repository)
    //                 }
    //             }, err => reject(err))
    //         }
    //     })
    // })
}

function writeToCaches(param) {
    const { root, repository, project } = param
    const projectPath = path.resolve(cacheRoot, root)
    // 确认项目文件夹存在
    fs.ensureDirSync(projectPath)

    // if (fs.pathExistsSync(projectPath)) {
    //     const git = SGitP(projectPath)
    // } else {
    //     SGitP(cacheRoot).clone(repository)
    //     .then(res => {
    //         console.log('clone-res:', res)
    //     })
    //     .catch(err => console.log('clone-err:', err))
    // }
}

export default function (param) {
    return new Promise((resolve, reject) => {
        const { root, repository, project } = param

        const publishProjectPath = path.resolve(cacheRoot, root)
        const testRootPath = path.resolve(testRoot, root)
        const repoName = Utils.getRepoName(repository)
        ensureGitRepo(path.resolve(publishRoot, repoName), repository)
            .then((res) => {
                resolve(res)
            }, err => {
                reject(err)
            })

    })
}
