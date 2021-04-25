const { basePath, srcDir } = require('../setting')
const path = require('path')
exports.resolve = dir => path.join(__dirname, '..', dir)

const inProject = path.resolve.bind(path, basePath)
exports.inProjectSrc = (file) => inProject(srcDir, file)

// es6 => es5

exports.bableConfig = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 2, // polyfill 需要使用@babel/runtime-corejs2
          useBuildIns: 'usage', // 按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
        }
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }], // 装饰器
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
      }]
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            browsers: [
              '> 1%',
              'last 2 versions',
              'not ie <= 8'
            ]
          }
        }
      ],
      '@babel/preset-react'
    ],
  }
}
