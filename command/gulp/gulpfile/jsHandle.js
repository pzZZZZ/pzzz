var path = require("path");
var srcDir = './src'
gulp.task('webpackjs', function () {
     webpack(require('./webpack.config.js'))
     .pipe(uglify({
        //mangle: true,//类型：Boolean 默认：true 是否修改变量名
        mangle: {except: ['require' ,'exports' ,'module']},//排除混淆关键字
        mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: false,//类型：Boolean 默认：true 是否完全压缩
        preserveComments: 'all' //保留所有注释
  	  }))
    .pipe(gulp.dest('./build/js'));
});
