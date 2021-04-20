const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")
const util = require("./util")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const ip = require("ip").address()
const { publicPath } = require('../project.config')
module.exports = webpackMerge(baseWebpackConfig, {
    // 入口
    entry: {
        normalize: [util.inProjectSrc('normalize')],
        main: [util.inProjectSrc('main'), `webpack-hot-middleware/client.js?path=${publicPath}__webpack_hmr`],
    },
    // 这种情况下，源自 loader 的 source map 会得到更好的处理结果
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: util.inProject("dist"),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    // 打包模式
    mode: "development",
    // 模块化
    module: {},
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new WatchMissingNodeModulesPlugin(util.resolve('node_modules')),
        new CaseSensitivePathsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devtool: "source-map", //inline把js打包在一个文件里面 hidden分离出来 eval也是分离
    // devServer: {
    //     historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
    //     open: true,
    //     // hotOnly: true, //启用热模块替换
    //     // quiet: true,//除了初始启动信息外，什么都不会写入控制台
    //     contentBase: false,
    //     publicPath: "/",
    //     host: ip,
    //     port: 3032,
    //     stats: {
    //         colors: true
    //     }
    // },





})