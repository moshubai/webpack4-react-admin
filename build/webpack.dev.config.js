const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")
const util = require("./util")

const webpack = require("webpack")
const path = require("path")
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const { publicPath,basePath } = require('../project.config')

const inProject = path.resolve.bind(path, basePath)

module.exports = webpackMerge(baseWebpackConfig, {
    // 入口
    entry: {
        normalize: [util.inProjectSrc('normalize')],
        main: [util.inProjectSrc('main'), `webpack-hot-middleware/client.js?path=${publicPath}__webpack_hmr`],
    },
    // 这种情况下，源自 loader 的 source map 会得到更好的处理结果
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: inProject("dist"),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    // 打包模式
    mode: "development",
    devtool: "source-map", //inline把js打包在一个文件里面 hidden分离出来 eval也是分离
    // 模块化
    module: {
        rules:[
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  // 只能在production中运用MiniCssExtractPlugin.loader
                  {
                    loader:  'style-loader',
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
                      ],
                    },
                  }
                ]
              }
        ]
    },
    // 组件
    plugins: [
        
       
        new WatchMissingNodeModulesPlugin(util.resolve('node_modules')),
        new CaseSensitivePathsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    
    // devServer: {
    //     historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
    //     open: true,
    //     contentBase: false,
    //     publicPath: "/",
    //     host: ip,
    //     port: 3032,
    //     stats: {
    //         colors: true
    //     }
    // },





})