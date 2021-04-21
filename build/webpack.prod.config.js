const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")
const util = require("./util")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require("webpack")
const path = require("path")
const { basePath } = require('../project.config')

const inProject = path.resolve.bind(path, basePath)
module.exports = webpackMerge(baseWebpackConfig, {
  // 入口
  entry: {
    normalize: [util.inProjectSrc('normalize')],
    main: [util.inProjectSrc('main')],
  },
  // 这种情况下，源自 loader 的 source map 会得到更好的处理结果
  devtool: false,
  output: {
    path: inProject("dist"),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
  },
  // 指定构建环境  
  mode: "production",
  optimization: {
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
  // 插件
  plugins: [
    
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname
      }
    }),
  ],

})