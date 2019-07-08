const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, '../static/dll'),
    filename: '[name].dll.js',
    library: '[name]_lib',
    libraryTarget: 'var',
    pathinfo: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../static/dll/**/*')],
    }),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../static/dll', '[name]-manifest.json'),
      name: '[name]_lib',
      context: path.resolve(__dirname),
    }),
  ],
};
