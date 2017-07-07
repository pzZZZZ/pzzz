'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const initCatalog = require('./initCatalog/index.js');
module.exports = ()=>{
  co(function *() {

    // 分步接收用户输入的参数
    // let tplName = yield prompt('Template name: ')
    // let desc = yield prompt('desc: ')
    // let gitUrl = yield prompt('Git https link: ')
    // let branch = yield prompt('Branch: ')
    let catalogName = yield prompt('请输入要创建的项目名: ')
    // let es6 = yield prompt('是否需要编译es6(Y/N): ')
    initCatalog(catalogName)
    // if(es6 == `Y`){
    //   console.log('需要编译ES6')
    // }
    // 避免重复添加
    // if (!config.tpl[tplName]) {
    //   config.tpl[tplName] = {}
    //   config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
    //   config.tpl[tplName]['branch'] = branch
    //   config.tpl[tplName]['desc'] = desc
    // } else {
    //   console.log(chalk.red('Template has already existed!'))
    //   process.exit()
    // }
    //
    // // 把模板信息写入templates.json
    // fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
    //   if (err) console.log(err)
    //   console.log(chalk.green('New template added!\n'))
    //   console.log(chalk.grey('The last template list is: \n'))
    //   console.log(config)
    //   console.log('\n')
    //   process.exit()
    //  })
  })
}
