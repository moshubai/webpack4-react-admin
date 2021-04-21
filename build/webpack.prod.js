const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base")
const util = require("./util")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require("webpack")
module.exports = webpackMerge(baseWebpackConfig, {
  // 指定构建环境  
  mode: "production",
  // 入口
  entry: {
    main: ['./src/main'],
  },
  // 出口
  output: {
    path: util.resolve("/dist"),
    filename: "js/[name].[hash].js",
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 只能在production中运用MiniCssExtractPlugin.loader
          {
            loader: MiniCssExtractPlugin.loader,
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
              sourceMap: false,
              includePaths: [
                util.inProjectSrc('styles'),
              ],
            },
          }
        ]
      }
    ]
  },
  optimization: {
    // 抽离webpack runtime到单文件
    runtimeChunk: "single",
    minimizer: [
      // mini js
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
      // mini css
      new OptimizeCSSAssetsPlugin({})
    ]
    // ...
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // html模板的生成路径
      template: util.inProjectSrc('index.html'),//html模板
      inject: true, // true：默认值，script标签位于html文件的 body 底部
      hash: true, // 在打包的资源插入html会加上hash
      //  html 文件进行压缩
      minify: {
        removeComments: true,               //去注释
        collapseWhitespace: true,           //压缩空格
        removeAttributeQuotes: true         //去除属性引用
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    // 确保在文件没发生改变时，contentHash也不会变化
    new webpack.HashedModuleIdsPlugin()
  ],
})