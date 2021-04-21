const util = require("./util")
const {
  env, basePath, externals, main,
  publicPath, globals, outDir,
  sourcemaps
} = require('../project.config')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const path = require("path")
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  // 出口
  output: {
    publicPath // 打包后的资源的访问路径前缀
  },
  resolve: {
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
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
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
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            "plugins": [
              [
                "@babel/plugin-transform-runtime",
                {
                  "corejs": 2, // polyfill 需要使用@babel/runtime-corejs2
                  "useBuildIns": "usage", //按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
                }
              ]
            ],
            "presets": [
              [
                "@babel/preset-env",
                {
                  "modules": false,
                  "targets": {
                    "browsers": [
                      "> 1%",
                      "last 2 versions",
                      "not ie <= 8"
                    ]
                  }
                }
              ],
              "@babel/preset-react"
            ],
          }

        }
      ],
      // 共享进程池
      threadPool: happyThreadPool,
      verbose: false,
    })
  ]

}
