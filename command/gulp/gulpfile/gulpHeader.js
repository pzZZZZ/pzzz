// 引入 gulp 工具
var gulp = require('gulp');

// 引入 gulp-webserver 模块
var webserver = require('gulp-webserver');

// 引入 css 预处理 压缩 模块
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

// 引入 js 模块化工具 gulp-webpack, 获得 js 文件名模块 vinyl-named, js 压缩模块
var named = require('vinyl-named');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');//CSS3自动补全
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
// 引入 fs url 模块
var fs = require('fs');
var url = require('url');

// 引入 rev revCollector 模块
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

// 引入 gulp-sequence 模块
var sequence = require('gulp-sequence');