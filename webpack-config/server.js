/**
 * Created by wlj at 2017/11/21.
 * dependent:
 * function:
 */
let path = require('path');
var express = require('express')
var opn = require("opn");
var webpack = require('webpack')
var WebpackDevMiddleware = require('webpack-dev-middleware')
var WebpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./../webpack.config')
const ROOT_PATH = path.resolve(__dirname+'..');
const APP_PATH = path.resolve(ROOT_PATH, 'resources');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public/dist');

console.log(Object.keys(config.entry));
Object.keys(config.entry).forEach(function (name) {
    console.log(config.entry[name]  );
    config.entry[name].unshift("webpack-hot-middleware/client?noInfo=true&reload=true&overlay=true");
});
console.log(Object.keys(config.entry));
console.log(Object.values(config.entry));
const app = express(),
    DIST_DIR = path.join(__dirname, "..","public"), // 设置静态访问文件路径
    PORT = 9090, // 设置启动端口
    compiler = webpack(config)
app.use(WebpackDevMiddleware(compiler, {
    noInfo: true,
    quiet: true ,//向控制台显示任何内容
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}));
//webpack 热更新插件
app.use(WebpackHotMiddleware(compiler, {
    log: console.log,
    // path: '/__webpack_hmr',
    heartbeat: 2000
}));
//设置静态资源服务器
console.log(DIST_DIR);
app.use(express.static(DIST_DIR));
//启动服务
app.listen(PORT, function () {
    console.log("Listening on http://172.16.2.77" + PORT);
});