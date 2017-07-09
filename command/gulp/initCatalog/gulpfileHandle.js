const fs = require('fs')
const async = require('async')
var config = ""
var packconfig = ""
var babelrc = ""
module.exports = (name,option)=>{
	var itemName = name;
	console.log(option)
   async.series({
   	ReadgulpHeader(next){
   		  fs.readFile('./command/gulp/gulpfile/gulpHeader.js', 'utf-8', function(err, data) {
              // 读取文件失败/错误
                if (err) {
                    throw err;
                }
                // 读取文件成功
                // console.log( data.toString())
                config = data.toString()
                // console.log(config)
                next()
            });
   	},
   	ReadgulpScss(next){
   		if(option.scss =='y'||'Y'){
   			fs.readFile('./command/gulp/gulpfile/cssHandle.js', 'utf-8', function(err, data) {
              // 读取文件失败/错误
                if (err) {
                    throw err;
                }
                config += data.toString()
                console.log(config)
                next()
            });
   		}
   	},
	ReadgulpEs6(next){
   		if(option.es6 =='y'||'Y'){
   			fs.readFile('./command/gulp/gulpfile/jsHandle.js', 'utf-8', function(err, data) {
              // 读取文件失败/错误
                if (err) {
                    throw err;
                }
                config += data.toString()
                async.series({
                	//配置webpack.config.js
                	ReadWebpack(next){
                			fs.readFile('./command/gulp/gulpfile/webpack.config.js', 'utf-8', function(err, data) {
					              // 读取文件失败/错误
					                if (err) {
					                    throw err;
					                }
					                
					                packconfig = data.toString();
					                next()
					            });
                	},
                	WriteWebpack(next){
            			 fs.writeFile('./webpack.config.js', packconfig, function(err) {
			                 if (err) {
			                     throw err;
			                 }
			                 next()
			             	})
                	},
                	RmWebpack(next){
                		 fs.rename('./webpack.config.js',`./${itemName}/webpack.config.js`, function (err) {
		                       if(err) {
		                         console.error(err);
		                         return;
		                       }
		                       // console.log('webpackConfig移动成功')
		                       next()
		                     });
                	},
                	ReadBabel(next){
                			fs.readFile('./command/gulp/gulpfile/.babelrc', 'utf-8', function(err, data) {
					              // 读取文件失败/错误
					                if (err) {
					                    throw err;
					                }
					                
					                babelrc = data.toString();
					                next()
					            });
                	},
                	WriteBabel(next){
                			 fs.writeFile('./.babelrc', babelrc, function(err) {
			                 if (err) {
			                     throw err;
			                 }
			                 next()
			             	})
                	},
                	RmBabel(next){
	                		 fs.rename('./.babelrc',`./${itemName}/.babelrc`, function (err) {
			                       if(err) {
			                         console.error(err);
			                         return;
			                       }
			                       // console.log('babelrc移动成功')
			                       next()
			                     });
                	},
                	MkModule(next){
                		 fs.mkdir(`./module`, function (err) {
							    if(err)
							      throw err;
							    // console.log('创建module成功')
							    next()
							    });
                	},
                	RmModule(next){
            			 fs.rename('./module',`./${itemName}/src/module`, function (err) {
		                       if(err) {
		                         console.error(err);
		                         return;
		                       }
		                       // console.log('module移动成功')
		                       next()
		                     });
                	}
                })
                
                // console.log(config)
                next()
            });
   		}
   	},
   	WriteGulpWatch(next){
   			let libs = `gulp.task('copy-libs',function(){
		   		gulp.src('./src/libs/**/*')
		    		.pipe(gulp.dest('./build/libs'));
			})`
			let images = `gulp.task('copy-images', function () {
			 	gulp.src('./src/images/**/*')
			        .pipe(gulp.dest('./build/images/'));
			});	`
			let watch = `gulp.task('build',function(){
			 watch('./src/styles/*.scss',batch(function (events, done) {
			  gulp.start('scss', done);
			 }));
			 watch('./src/images/**/*',batch(function (events, done) {
			  gulp.start('copy-images', done);
			 }));
			 watch('./src/scripts/*.js',batch(function (events, done) {
			  gulp.start('webpackjs', done);
			 }));
			  watch('./src/libs/**/*',batch(function (events, done) {
			  gulp.start('copy-libs', done);
			 }));
			});`
			config+=`${libs}
			${images}
			${watch}`
			next()
   	},
   	WritegulpHeader(next){
   		 fs.writeFile(`./${itemName}/gulpfile.js`, config, function(err) {
                 if (err) {
                     throw err;
                 }
                 console.log('gulpfile 已生成')
                next()
            })
               
   	}
   })
}
