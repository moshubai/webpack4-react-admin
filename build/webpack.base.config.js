const util = require("./util")
const {
  env, basePath, externals, main,
  publicPath, globals,
  sourcemaps
} = require('../project.config')
const __DEV__ = env === 'development'
const __TEST__ = env === 'test'
const __PROD__ = env === 'production'

const babelLoader = {
  loader: 'babel-loader',
  options: {
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
      }]
    ],
    presets: [
      ['@babel/preset-react'],
      ['@babel/preset-env', {
        modules: false,
        loose: true,
        // useBuiltIns: "usage",
        targets: {
          ie: 9,
          browsers: [
            'last 5 versions',
            'safari >= 7',
            'not ie < 9'
          ]
        }
      }],
    ]
  }
}
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
      util.inProject('src'),
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
        loader: 'happypack/loader?id=happyBabel',
      },
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
              sourceMap: sourcemaps,
              includePaths: [
                util.inProjectSrc('styles'),
              ],
            },
          }
        ]
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
      ...util.plugList,
    ]
  },

  plugins: [
    // 允许创建一个在编译时可以配置的全局常量
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
      __DEV__,
      __TEST__,
      __PROD__,
      ...globals
    }),
    new HappyPack({
      id: 'happyBabel',
      // cache: __DEV__,
      loaders: [babelLoader],
      // 共享进程池
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname
      }
    }),
    // moment 去除语言包，减少体积
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 碰到错误warning但是不停止编译
    new webpack.NoEmitOnErrorsPlugin()
  ]

}
