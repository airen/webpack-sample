const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'production', // 设置Webpack的mode模式

    // 生产环境下需要的相关插件配置
    plugins: [

    ],
})