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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "source-map", //inline把js打包在一个文件里面 hidden分离出来 eval也是分离
  devServer: {
    open: true,
    publicPath: "/",
    host: ip.address(),//ip
    port,//端口
    compress: true, //为每个静态文件开启 gzip
    historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
    hotOnly: true, //启用热模块替换
    // quiet: true,//除了初始启动信息外，什么都不会写入控制台
    progress: true,//将运行进度输出到控制台。
    contentBase: false,
    stats: {
      colors: true
    }
  },


})