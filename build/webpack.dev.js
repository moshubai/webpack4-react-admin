const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base")
const util = require("./util")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const {
  ip, port, env, basePath, externals, main,
  publicPath, globals, outDir,
  sourcemaps
} = require('../project.config')
module.exports = webpackMerge(baseWebpackConfig, {
  // 打包模式
  mode: "development",
  // 入口
  entry: {
    main: ['./src/main'],
  },
  // 出口
  output: {
    path: util.resolve("/dist"),
    filename: "js/[name].[hash].js",
  },
  // 模块化
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          'postcss-loader',
          {

            loader: 'sass-loader', // 编译 sass -> CSS
            options: {
              sourceMap: true,
              includePaths: [
                util.inProjectSrc('styles'),
              ],
            }
          },
        ],
      },
    ]
  },
  // 组件
  plugins: [
    new HtmlWebpackPlugin({
      template: util.inProjectSrc('index.html'),
      filename: "index.html",
      inject: true,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
  devtool: "source-map", //inline把js打包在一个文件里面 hidden分离出来 eval也是分离
  devServer: {
    historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
    open: true,
    // hotOnly: true, //启用热模块替换
    // quiet: true,//除了初始启动信息外，什么都不会写入控制台
    contentBase: false,
    publicPath: "/",
    host: ip.address(),
    port,
    stats: {
      colors: true
    }
  },


})