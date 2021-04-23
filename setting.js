const ip = require('ip')
const NODE_ENV = process.env.NODE_ENV || 'development'
const port = '8999'
const environment = process.argv[2]
const hostConfig = {
  test:'http://192.168.0.172:8888/',
  dev:'http://192.168.0.172:8888/',
  prod:'http://192.168.0.172:8888/'
}
let proxyHost = ''
switch (environment) {
  case 'prod':
  case 'test':
  case 'dev':
    proxyHost = hostConfig[environment]
    break
  default:
    proxyHost = hostConfig.test
}
module.exports = {
  ip,
  port,
  env: NODE_ENV,
  basePath: __dirname,
  srcDir: 'src',
  main: 'main',
  outDir: 'dist',
  publicPath: NODE_ENV === 'development' ? `http://${ip.address()}:${port}/` : './',
  sourcemaps:NODE_ENV === 'development',
  externals: {},
  globals: {},
  verbose: false,
  vendors: [
    'react',
    'react-dom',
    'react-router-dom'
  ],
  proxyHost,

  cookiesExpires: 1, // Cookies 默认保存时间，单位：天
}
