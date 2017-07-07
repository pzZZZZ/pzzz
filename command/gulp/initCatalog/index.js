'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const async = require('async')
var config = '';
var itemName = '';
module.exports = (name)=>{
  itemName = name;
  async.parallel({
    //创建文件夹
    styles(next){
    fs.mkdir(`./styles`, function (err) {
    if(err)
      throw err;
    console.log('创建styles成功')
    next()
    });
  },scripts(next){
    fs.mkdir(`./scripts`, function (err) {
    if(err)
      throw err;
     console.log('创建scripts成功')
     next()
    });
  },libs(next){
    fs.mkdir(`./libs`, function (err) {
    if(err)
      throw err;
     console.log('创建libs成功')
     next()
    });
  },images(next){
    fs.mkdir(`./images`, function (err) {
    if(err)
      throw err;
     console.log('创建images成功')
     next()
    });
  }},function(err,res){
      fs.mkdir(`./src`, function (err) {
      if(err)
        throw err;
       console.log('创建src成功')
       async.parallel({
         //移动文件夹
         rmstyles(next){
           fs.rename('./styles','./src/styles', function (err) {
              if(err) {
                console.error(err);
                return;
              }
              console.log('styles移动成功')
              next()
            });
         },
         rmimages(next){
           fs.rename('./images','./src/images', function (err) {
              if(err) {
                console.error(err);
                return;
              }
              console.log('images移动成功')
              next()
            });
         },
         rmlibs(next){
           fs.rename('./libs','./src/libs', function (err) {
              if(err) {
                console.error(err);
                return;
              }
              console.log('libs移动成功')
              next()
            });
         },
         rmscripts(next){
           fs.rename('./scripts','./src/scripts', function (err) {
              if(err) {
                console.error(err);
                return;
              }
              console.log('scripts移动成功')
              next()
            });
         }
       },function(err,res){
          async.series ({
            readPackage(next){
            fs.readFile('./command/gulp/package.json', 'utf-8', function(err, data) {
              // 读取文件失败/错误
                if (err) {
                    throw err;
                }
                // 读取文件成功
                // console.log( data.toString())
                config = data.toString()
                next()
            });
          }},function(err,res){
            fs.writeFile('./package.txt', config, function(err) {
                 if (err) {
                     throw err;
                 }
                console.log('package.json生成成功');
                async.series({
                  mkfile(next){
                    fs.mkdir(`./${itemName}`, function(err) {
                            if (err) {
                                throw err;
                            }
                            // console.log('make dir success.');
                            next()
                        });
                  },
                  rmPack(next){
                    fs.rename('./package.txt',`./${itemName}/package.json`, function (err) {
                       if(err) {
                         console.error(err);
                         return;
                       }
                       console.log('package.txt移动成功')
                       next()
                     });
                  },
                  rmSrc(next){
                    fs.rename('./src',`./${itemName}/src`, function (err) {
                       if(err) {
                         console.error(err);
                         return;
                       }
                       console.log('src移动成功')
                       next()
                     });
                  }
                },function(err,res){
                  if (err) {
                      throw err;
                  }
                  // (require('./gulpfileHandle.js'))()
                  console.log('suc')
                })
             });

          })

       })

      });

  })
}
