/**
 * Created by wlj at 2017/11/21.
 * dependent:
 * function:
 */
let webpack = require("webpack"),
    devWebpackConfig = require("./webpack.dev"), //开发环境webpack配置
    utils = require("./utils"),
    http = require('http'),
    path = require("path"),
    express = require('express'),
    app = express(),
    opn = require("opn"),
    config = utils.config,
    port = config.dev.port || 8090;

Object.keys(devWebpackConfig.entry).forEach(function (name) {
    devWebpackConfig.entry[name].unshift("webpack-hot-middleware/client?reload=true&overlay=true");
});
//webpack编译器
let compiler = webpack(devWebpackConfig);
//webpack-dev-middleware webpack中间件容器
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.dev.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}));
//webpack 热更新插件
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));
//设置静态资源服务器
app.use('/static', express.static('./static'));
// 测试数据
app.use('/mock', express.static('./mock'));

//启动服务
server.listen(port, function () {
    console.log("Listening on http://127.0.0.1:" + port);
  /*  if (config.dev.autoOpenBrowser) {
        opn("http://127.0.0.1:" + port + config.dev.autoOpenBrowserPath);
    }*/
});