const util = require('./util')
const { publicPath, globals, env } = require('../setting')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
// const HappyPack = require('happypack')
// const os = require('os')
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
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
      util.resolve('src'), // 指定当前目录下的 node_modules 优先查找
      'node_modules', // 将默认写法放在后面
    ],
    // modules: [path.resolve(__dirname, './node_modules')],
    extensions: ['.js', '.jsx', '.json', '.scss', '.jpg', '.png'],
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
      // react: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
      // 'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
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
        // include: path.resolve(__dirname, './src'), // 只对 src 下面的文件使用
        use: [{
          loader: 'thread-loader',
          options: {
            workers: 3, // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
          }
        }, util.bableConfig]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name]-[hash].[ext]',
            // outputPath: '../images',
            // publicPath: '/images'
            outputPath: 'images',
            publicPath: '../images/',

          }

        }
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
      //     name: 'static/img/[name].[hash:7].[ext]'
      //   }
      // },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
            name: 'fonts/[name].[hash:7].[ext]',
            publicPath: '../',
          }
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
    // new HappyPack({
    //   id: 'babel',
    //   loaders: [util.bableConfig],
    //   threadPool: happyThreadPool, // 共享进程池
    //   verbose: false,
    // }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
      __DEV__,
      __TEST__,
      __PROD__,
      ...globals
    })
  ],

}
