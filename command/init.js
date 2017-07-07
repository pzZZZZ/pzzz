'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
 co(function *() {
    // 处理用户输入
      let tplName = yield prompt('Template name: ')
      let projectName = yield prompt('Project name: ')
      let gitUrl
      let branch

    if (!config.tpl[tplName]) {
        console.log(chalk.red('\n × Template does not exit!'))
        process.exit()
    }
    gitUrl = config.tpl[tplName].url
    branch = config.tpl[tplName].branch

    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`

    // console.log(chalk.white('\n Start generating...'))
    console.log(chalk.white('\n 开始生成相关文件...'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      // console.log(chalk.green('\n √ Generation completed!'))
      console.log(chalk.green('\n √ 目录已初始化成功~~~'))
      console.log(`\n cd ${projectName} && npm install||yarn \n`)
      process.exit()
    })
  })
}
