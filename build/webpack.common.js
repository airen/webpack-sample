const webpack = require('webpack');
const path =  require('path');
const DIST_PATH = path.resolve(__dirname, '../dist/');  // 声明/dist的路径

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

module.exports = {
    // 入口JS路径
    // 指示Webpack应该使用哪个模块，来作为构建其内部依赖图的开始
    entry: path.resolve(__dirname,'../src/index.js'),


    // 编译输出的JS入路径 
    // 告诉Webpack在哪里输出它所创建的bundle，以及如何命名这些文件
    output: {
        path: DIST_PATH,        // 创建的bundle生成到哪里
        filename: 'bundle.js',    // 创建的bundle的名称
    },

    // 模块解析
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },

    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: HtmlWebpackTemplate,
            appMountId: 'root',
            filename: 'index.html'
        }),
    ]
}