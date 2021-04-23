const util = require('./util')
const { publicPath, globals, env } = require('../setting')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const __DEV__ = env === 'development'
const __TEST__ = env === 'test'
const __PROD__ = env === 'production'
module.exports = {
  // 出口
  output: {
    publicPath // 打包后的资源的访问路径前缀
  },
  resolve: {
    modules: [
      util.resolve('src'),
      'node_modules',
    ],
    extensions: ['*', '.web.tsx', '.web.ts', '.web.js', '.js', '.jsx', '.json', '.scss', '.jpg', '.png'],
    alias: {
      '@': util.resolve('src'),
      pages: util.resolve('src/pages'),
      routes: util.resolve('src/routes'),
      layout: util.resolve('src/page-layout'),
      components: util.resolve('src/components'),
      // mobx: path.resolve(__dirname, '../node_modules/mobx/lib/mobx.js'),
      func: util.resolve('src/func'),
      mixin: util.resolve('src/styles/_mixin.scss'),
      style: util.resolve('src/styles'),
      Api: util.resolve('src/api/index'),
    },
    // add pnp
    plugins: [
      PnpWebpackPlugin
    ]
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/, // 屏蔽不需要处理的文件（文件夹）（可选）
        // loader: 'babel-loader',//loader的名称（必须）
        use: ['happypack/loader?id=babel']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 抽离第三方插件
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        },
        // 其他同步加载公共包
        commons: {
          chunks: 'all',
          minChunks: 2,
          name: 'commons',
          priority: 80,
        }
      }
    }
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      loaders: [util.bableConfig],
      threadPool: happyThreadPool, // 共享进程池
      verbose: false,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
      __DEV__,
      __TEST__,
      __PROD__,
      ...globals
    })
  ],

}
