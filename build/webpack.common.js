const webpack = require('webpack');
const path = require('path');
const DIST_PATH = path.resolve(__dirname, '../dist/'); // 声明/dist的路径

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 入口JS路径
  // 指示Webpack应该使用哪个模块，来作为构建其内部依赖图的开始
  entry: {
    index: path.resolve(__dirname, '../src/pages/index/index.tsx'),
  },

  // 编译输出的JS入路径
  // 告诉Webpack在哪里输出它所创建的bundle，以及如何命名这些文件
  output: {
    path: DIST_PATH, // 创建的bundle生成到哪里
    // filename: 'js/[name].bundle.[hash].js', // 创建的bundle的名称
    // sourceMapFilename: 'js/[name].js.map', // 创建的SourceMap的文件名
    // publicPath: '/', // 指定存放静态资源的CDN地址
  },

  resolve: {
    // 配置之后可以不用在require或是import的时候加文件扩展名，会依次尝试添加扩展名进行匹配
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'],
    modules: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules')],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@images': path.resolve(__dirname, '../src/assets/images'),
      '@fonts': path.resolve(__dirname, '../src/assets/fonts'),
      '@icons': path.resolve(__dirname, '../src/assets/icons'),
    },
  },

  // 模块解析
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'awesome-typescript-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint/lib/cli-engine/formatters/stylish'),
            },
          },
        ],
      },

      // CSS Loader
      {
        test: /\.(sc|sa|c)ss$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader:
              process.env.NODE_ENV !== 'dev'
                ? MiniCssExtractPlugin.loader
                : ['css-hot-loader', 'style-loader'],
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-modules-typescript-loader',
            options: {
              namedExport: true,
              camelCase: true,
              sass: true,
              modules: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      // images loader
      {
        test: /\.(png|jp(e*g)|gif|svg|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 小于10kb的图片编译成base64编码，大于的单独打包成图片
              name: 'images/[hash]-[name].[ext]', // Placeholder占位符
              publicPath: '/assets/', // 最终生成的CSS代码中，图片URL前缀
              outputPath: 'assets', // 图片输出的实际路径（相对于/dist目录）
            },
          },
        ],
      },

      // font loader
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 小于10kb的字体编译成base64编码
              name: 'fonts/[hash]-[name].[ext]', // Placeholder占位符
              publicPath: '/assets/', // 最终生成的CSS代码中，字体URL前缀
              outputPath: 'assets', // 字体输出的实际路径（相对于/dist目录）
            },
          },
        ],
      },
    ],
  },

  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: HtmlWebpackTemplate,
      appMountId: 'root',
      filename: 'index.html',
      minify: {
        removeComments: true, // 去掉注释
        collapseWhitespace: true, // 去掉多余空白
        removeAttributeQuotes: true, // 去掉一些属性的引号，例如id="moo" => id=moo
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name]-[id].[contenthash].chunk.css',
    }),
  ],
};
