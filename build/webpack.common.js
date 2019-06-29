const webpack = require('webpack');
const path =  require('path');
const DIST_PATH = path.resolve(__dirname, '../dist/');  // 声明/dist的路径

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

module.exports = {
    // 入口JS路径
    // 指示Webpack应该使用哪个模块，来作为构建其内部依赖图的开始
    entry: {
        index: path.resolve(__dirname,'../src/pages/index/index.tsx'),
    },


    // 编译输出的JS入路径 
    // 告诉Webpack在哪里输出它所创建的bundle，以及如何命名这些文件
    output: {
        path: DIST_PATH,        // 创建的bundle生成到哪里
        filename: '[name].bundle.js',    // 创建的bundle的名称
    },

    resolve: {
        // 配置之后可以不用在require或是import的时候加文件扩展名，会依次尝试添加扩展名进行匹配
        extensions: ['.ts', '.tsx', '.js', '.jsx','.json'],
        modules: [
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../node_modules'),
        ],
    },

    // 模块解析
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "awesome-typescript-loader"
                    }
                ]
            },

            // CSS Loader
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            "sourceMap": true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            "sourceMap": true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            "sourceMap": true
                        }
                    }
                ]
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