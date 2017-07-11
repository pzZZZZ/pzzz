
// css 预处理 和 压缩
//CSS入口文件数组 每新增一个模块必须添加一个入口
var cssFiles = [
  './src/styles/**/*'
];
gulp.task('scss', function () {
  gulp.src(cssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 4 versions', 'Android >= 4.0','iOS >=7']
        }))
    .pipe(minifyCSS())
    .pipe(rename(function(path){
       path.extname = ".min.css";
    }))
    .pipe(gulp.dest('./build/styles/'));
});
