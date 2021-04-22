const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const util = require('./util')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = webpackMerge(baseWebpackConfig, {
  // 打包模式
  mode: 'development',
  // 入口
  entry: {
    main: [util.inProjectSrc('main')],
  },
  // 出口
  output: {
    path: util.resolve('dist'),
    filename: 'js/[name].[hash].js',
  },
  // 模块化
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 只能在production中运用MiniCssExtractPlugin.loader
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                util.inProjectSrc('styles'),
              ]
            },
          }
        ]
      },
    ]
  },
  devtool: 'source-map', // inline把js打包在一个文件里面 hidden分离出来 eval也是分离
  // 组件
  plugins: [
    new HtmlWebpackPlugin({
      template: util.inProjectSrc('index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

})
