'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const initCatalog = require('./initCatalog/index.js')
const path = require('path')


module.exports = ()=>{

  co(function *() {
    // 分步接收用户输入的参数
    let catalogName = yield prompt('请输入要创建的项目名: ')
    let es6 = yield prompt('是否需要编译js(Y/N): ')
    let scss = yield prompt('是否需要编译scss(Y/N): ')
    let server = yield prompt('是否需要安装webserver: ')
    let option = {
        catalogName,
        scss,
        es6,
        server
    }
    initCatalog(catalogName,option)
  })
}
