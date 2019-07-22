const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production', // 设置Webpack的mode模式
  devtool: 'cheap-module-source-map',

  output: {
    filename: 'js/[name].[contenthash].js', // entry对应的key值
    chunkFilename: 'js/[name].[contenthash].js', // 间接引用的文件会走这个配置
    publicPath: '/', // 指定存放静态资源的CDN地址
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true, // 开启文件缓存
          parallel: true, // 使用多进程并行来提高构建速度
          sourceMap: true, // 开启source map
          warnings: false, // 在UglifyJS删除没有用到的代码时不输出警告
          compress: {
            drop_console: true, // 删除所有的console语句
            collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
          },
          output: {
            beautify: false, // 最紧凑的输出
            comments: false, // 删除所有的注释
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
    ],
  },
  // 生产环境下需要的相关插件配置
  plugins: [
    new CSSSplitWebpackPlugin({
      size: 4000,
      filename: '[name]-[part].[ext]',
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../static/dll/vendors.dll.js'), // 对应的 dll 文件路径
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '..', 'static/dll/vendors-manifest.json'),
    }),
  ],
});
