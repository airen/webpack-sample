const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

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
