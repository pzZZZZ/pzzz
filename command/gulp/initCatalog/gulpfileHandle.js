const fs = require('fs')
const async = require('async')
const path = require('path');
var config = ""
var packconfig = ""
var babelrc = ""
module.exports = (name,option)=>{
	var itemName = name;
   async.series({
   	ReadgulpHeader(next){
   		  fs.readFile(path.resolve(__dirname,'../gulpfile','gulpHeader.js'), 'utf-8', function(err, data) {
              // 读取文件失败/错误
                if (err) {
                    throw err;
                }
                // 读取文件成功
                // console.log( data.toString())
                config += data.toString()
                // console.log('读取header成功')
                next()
            });
   	},
   	ReadgulpScss(next){
			// console.log(option.scss == 'y'||option.scss=='Y')
   		if(option.scss =='y'||option.scss=='Y'){
   			fs.readFile(path.resolve(__dirname,'../gulpfile','cssHandle.js'), 'utf-8', function(err, data) {
              // 读取文件失败/错误
                if (err) {
                    throw err;
                }
                config += data.toString()
                // console.log(config)
                next()
            });
   		}else{

				let css = `var cssFiles = [
				  './src/styles/**/*'
				];
				gulp.task('scss', function () {
				  gulp.src(cssFiles)
				    .pipe(autoprefixer({
				            browsers: ['last 4 versions', 'Android >= 4.0','iOS >=7']
				        }))
				    .pipe(minifyCSS())
				    .pipe(rename(function(path){
				       path.extname = ".min.css";
				    }))
				    .pipe(gulp.dest('./build/styles/'));
				});
				`
				config += css;
				next()
			}
   	},
	ReadgulpEs6(next){

   		if(option.es6 =='y'||option.es6=='Y'){
   			console.log('es')
   			fs.readFile(path.resolve(__dirname,'../gulpfile','jsHandle.js'), 'utf-8', function(err, data) {
              // 读取文件失败/错误
                if (err) {
                    throw err;
                }
                config += data.toString()
                async.series({
                	//配置webpack.config.js
                	ReadWebpack(next){
										//./command/gulp/gulpfile/webpack.config.js
                			fs.readFile(path.resolve(__dirname,'../gulpfile','webpack.config.js'), 'utf-8', function(err, data) {
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
			                 console.log('webpackConfig生成成功')
			                 next()
			             	})
                	},
                	RmWebpack(next){
                		console.log('zzz')
                		 fs.rename('./webpack.config.js',`./${itemName}/webpack.config.js`, function (err) {
		                       if(err) {
		                         console.error(err);
		                         return;
		                       }
		                       console.log('webpackConfig移动成功')
		                       next()
		                     });
                	},
                	ReadBabel(next){
                			fs.readFile(path.resolve(__dirname,'../gulpfile','.babelrc'), 'utf-8', function(err, data) {
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
                },function(){
                	 next()
                })

                

            });


   		} else{

					let jsconfig =`gulp.task('webpackjs', function () {
					     .pipe(uglify({
					        //mangle: true,//类型：Boolean 默认：true 是否修改变量名
					        mangle: {except: ['require' ,'exports' ,'module']},//排除混淆关键字
					        mangle: true,//类型：Boolean 默认：true 是否修改变量名
					        compress: false,//类型：Boolean 默认：true 是否完全压缩
					        preserveComments: 'all' //保留所有注释
					  	  }))
					    .pipe(gulp.dest('./build/js'));
					});`
					config +=jsconfig
					next()
			}
 
			
   	},
		WriteServer(next){
			let serverOption = `
			// 引入 gulp-webserver 模块
			var webserver = require('gulp-webserver');
			gulp.task('webserver', function () {
			  gulp.src('./')
			    .pipe(webserver({
			      host: 'localhost',
			      port: 8080,
			      directoryListing: {
			        enable: true,
			        path: './'
			      },
			      livereload: true,
			      // mock 数据
			      middleware: function (req, res, next) {
			        var urlObj = url.parse(req.url, true);
			        switch (urlObj.pathname) {
			          case '/api/orders.php':
			            // res.setHeader('Content-Type', 'application/json');
			            // fs.readFile('./mock/list.json', function (err, data) {
			            //   res.end(data);
			            // });
			            return;
			          case '/api/user':
			            // ...

			          case '/api/cart':
			            // ...
			            return;
			        }
			        next();
			      }
			    }))
			});
			`
			if(option.server =='y'||option.server=='Y'){
				config+=`${serverOption}`
				next()
			}else{
				next()

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
			var watch =''
			if(option.server == 'y'||option.server=='Y'){
				 watch = `gulp.task('build',function(){
					gulp.start('webserver')
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
			}else{
				 watch = `gulp.task('build',function(){
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
			}

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
                 console.log('目录已生成完毕')
				 process.exit()
                next()

            })

   	}
   })
}
