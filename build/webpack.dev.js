const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const DIST_PATH = path.resolve(__dirname, '../dist/');  // 声明/dist的路径

module.exports = merge(commonConfig, {
    mode: 'development', // 设置webpack mode的模式
    devtool: 'cheap-module-eval-source-map', // 设置SoureMap的模式

    // 开发环境下需要的相关插件配置
    plugins: [

    ],

    // 开发服务器
    devServer: {
        hot: true,                  // 热更新，无需手动刷新
        contentBase: DIST_PATH,     // 
        host: '0.0.0.0',            // host地址
        port: 8080,                 // 服务器端口
        historyApiFallback: true,   // 该选项的作用所用404都连接到index.html
        proxy: {
            "/api": "http://localhost:3000" // 代理到后端的服务地址，会拦截所有以api开头的请求地址
        }
    }
})