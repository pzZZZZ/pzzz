var path = require("path");
var srcDir = './src';
var fs = require('fs');
var webpack = require('gulp-webpack');
function getEntry() {
    var jsPath = path.resolve(srcDir, 'scripts');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'scripts', item);
        }
    });
    return files;
}
module.exports = {
	 entry:getEntry(),
     output: {
        filename: '[name].min.js'
      },
     module: {  
        loaders: [{  
            test: /\.js$/,  
            exclude: /node_modules/,  
            loader: 'babel-loader'  
        }]  
    }
}