const path = require("path")
const PnpWebpackPlugin = require("pnp-webpack-plugin")
const webpack = require("webpack")
const HappyPack = require("happypack")
const os = require('os')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const util = require("./util")
const {
  env, basePath, externals, main,
  publicPath, globals,
  sourcemaps
} = require('../project.config')

const inProject = path.resolve.bind(path, basePath)

const __DEV__ = env === 'development'
const __TEST__ = env === 'test'
const __PROD__ = env === 'production'


module.exports = {
  // 配置如何展示性能提示
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  // 出口
  output: {
    publicPath// 打包后的资源的访问路径前缀
  },
  resolve: {
    modules: [
      inProject('src'),
      'node_modules',
    ],
    extensions: ['*', '.web.tsx', '.web.ts', '.web.js', '.js', '.jsx', '.json', '.scss', '.jpg', '.png'],
    alias: {
      '@': util.resolve("src"),
      pages: util.resolve(`src/views`),
      routes: util.resolve(`src/routes`),
      layout: util.resolve(`src/page-layout`),
      components: util.resolve(`src/components`),
      mobx: path.resolve(__dirname, '../node_modules/mobx/lib/mobx.js'),
      store: util.resolve(`src/mobx/index`),
      api: util.resolve(`src/api`),
      func: util.resolve(`src/func`),
      mixin: util.resolve(`src/styles/_mixin.scss`),
      style: util.resolve(`src/styles`)
    },
    // add pnp
    plugins: [
      PnpWebpackPlugin
    ]
  },
  // 解析缓存(resolve caching)中的上下文(context)会被忽略。这解决了性能衰退的问题。
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ]
  },
  // 外部扩展，例如jQuery
  externals,
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
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=babel']
      },
      // images
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name]-[hash].[ext]'
        },
      },
      // fonts
      {
        test: new RegExp(`\\.woff$`),
        loader: 'url-loader',
        options: {
          name: 'fonts/[name]-[hash].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      },
      {
        test: new RegExp(`\\.woff2$`),
        loader: 'url-loader',
        options: {
          name: 'fonts/[name]-[hash].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff2',
        }
      }, {
        test: new RegExp(`\\.otf$`),
        loader: 'url-loader',
        options: {
          name: 'fonts/[name]-[hash].[ext]',
          limit: 10000,
          mimetype: 'font/opentype',
        }
      }, {
        test: new RegExp(`\\.ttf$`),
        loader: 'url-loader',
        options: {
          name: 'fonts/[name]-[hash].[ext]',
          limit: 10000,
          mimetype: 'application/octet-stream',
        }
      }, {
        test: new RegExp(`\\.eot$`),
        loader: 'url-loader',
        options: {
          name: 'fonts/[name]-[hash].[ext]',
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
        }
      }, {
        test: new RegExp(`\\.svg$`),
        loader: 'url-loader',
        options: {
          name: 'fonts/[name]-[hash].[ext]',
          limit: 10000,
          mimetype: 'image/svg+xml',
        }
      },
    ]
  },

  plugins: [
    new HappyPack({
      id: 'babel',
      // cache: __DEV__,
      loaders: [util.babelLoader],
      // 共享进程池
      threadPool: happyThreadPool,
      verbose: false,
    }),
    // 允许创建一个在编译时可以配置的全局常量
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
      __DEV__,
      __TEST__,
      __PROD__,
      ...globals
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: util.inProjectSrc('index.html'),//html模板
      inject: true, // true：默认值，script标签位于html文件的 body 底部
      // hash: true, // 在打包的资源插入html会加上hash
      //  html 文件进行压缩
      minify: {
        removeComments: true,               //去注释
        collapseWhitespace: true,           //压缩空格
        removeAttributeQuotes: true         //去除属性引用
      }
    }),
    // moment 去除语言包，减少体积
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 碰到错误warning但是不停止编译
    new webpack.NoEmitOnErrorsPlugin()
  ]

}
