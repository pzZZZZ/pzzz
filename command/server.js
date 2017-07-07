'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const child_process = require('child_process')



module.exports = (option) => {

  console.log(`server is running port at ${option}`)

  function exec(cmd) {
    return child_process.execSync(`http-server -p ${option}`).toString().trim()
  }
  exec()
}
