const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")
const util = require("./util")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = webpackMerge(baseWebpackConfig, {
  // 入口
  entry: {
    normalize: [util.inProjectSrc('normalize')],
    main: [util.inProjectSrc('main')],
  },
  // 这种情况下，源自 loader 的 source map 会得到更好的处理结果
  devtool: false,
  output: {
    path: util.inProject("dist"),
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
    new HtmlWebpackPlugin({
      filename: util.resolve('./../dist/index.html'), // html模板的生成路径
      template: 'public/index.html',//html模板
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
    })
  ],

})