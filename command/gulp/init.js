'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const initCatalog = require('./initCatalog/index.js')
const path = require('path')
// console.log( `dirname = ${path.dirname(__dirname)}`)
module.exports = ()=>{
  co(function *() {

    // 分步接收用户输入的参数
    // let tplName = yield prompt('Template name: ')
    // let desc = yield prompt('desc: ')
    // let gitUrl = yield prompt('Git https link: ')
    // let branch = yield prompt('Branch: ')
    let catalogName = yield prompt('请输入要创建的项目名: ')
    let es6 = yield prompt('是否需要编译js(Y/N): ')
    let scss = yield prompt('是否需要编译scss(Y/N): ')
    let option = {
        catalogName,
        scss,
        es6
    }
    initCatalog(catalogName,option)
  })
}
