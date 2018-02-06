let path = require('path');
let utils = require('./webpack-config/utils');
let env=process.env.NODE_ENV;
let production = env === 'production';
let publicPath='/dist/';
let watchPort='3000';//可以自己配置，但是请勿提交
if (env==='hot') publicPath = "http://"+utils.getIPAdress()+":"+watchPort+"/";
let entry = {
    'index': './js/index.js',
    'point':'./js/point.js'
};
const commonConfig = {
    context: path.resolve('resources/assets'),
    entry: entry,
    output: {
        path: path.join(__dirname, 'public/dist'),
        filename: 'js/[name].js?v=[chunkhash]',
        publicPath: publicPath,
        chunkFilename: 'js/[name].js?v=[chunkhash]',
    },
    module: {
        rules: require('./webpack-config/fileLoader.config'),
    },
    resolve: {
        unsafeCache: true,
        extensions: ['*', '.js', '.jsx', '.vue'],
        alias: {
                'jsDir':path.resolve(__dirname, 'resources/assets/js')
       /*     'art-template': 'art-template/dist/template.js',
            'flexslider': path.resolve(__dirname, 'resources/assets/js/web/common/jquery.flexslider.js'),
            'ckk': path.resolve(__dirname, 'resources/assets/js/web/common/newCommonConfig.js'),
            'ckkValidate': path.resolve(__dirname, 'resources/assets/js/web/public/jquery.validate.method.js'),
            'ckk-jquery-dialog': path.resolve(__dirname, 'resources/assets/js/web/public/jquery.dialog.js'),
            'carSelectPanel':path.resolve(__dirname,'resources/assets/js/web/common/carSelectPanel.js'),
            'commonDir':path.resolve(__dirname,'resources/assets/js/web/common'),
            'imgWebDir':path.resolve(__dirname,'resources/assets/images/web'),
            'sassWebDir':path.resolve(__dirname,'resources/assets/sass/web')*/
        }
    },
    plugins:require('./webpack-config/plugins.config.js'),
    devtool: production ? '':'cheap-module-eval-source-map'
};
const productionConfig = () => commonConfig;
const developmentConfig = () => commonConfig;


const hotConfig = () => {
    const config = {
        output: {
            path: path.join(__dirname, 'public/dist'),
            filename: 'js/[name].js',
            publicPath: publicPath,
            chunkFilename: 'js/[name].js',
        },
        devServer:{
            hot:true,//这将启用热重载
            inline:true,//使用hmr
            overlay: false, // display errors as browser-overlay
            // hotOnly:true,
            quiet: false,
            host:utils.getIPAdress(),
            port:3000,
            compress:true,
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Method':'POST,GET'
            },
            contentBase:path.join(__dirname,"public"),// should指向laravel公用文件夹
            watchOptions:{
                poll:false //需要宅基地/流浪者设置
            }
        },
    };

    return Object.assign({}, commonConfig, config);
};
module.exports = type=>{
    type=env;
    if(env==='hot'){
        return hotConfig();
    }else{
        return commonConfig;
    }
}

