'use strict'
const config = require('../templates')

module.exports = () => {
  let tpl = config.tpl;
  for (var value in config.tpl) {
    console.log(`模板:${value}-------模板描述:${tpl[value].desc}`);
  }
  process.exit()
}
