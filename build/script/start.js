const WebpackServer = require('webpack-dev-server')
const setting = require('../../setting')
const ip = require('ip').address()
const devConfig = require('../webpack.dev')
const webpack = require('webpack')
const logger = require('../logger')
const net = require('net')
const compiler = webpack(devConfig)

// let port =

function listenPort (port) {
  const server = net.createServer().listen(port)
  server.on('listening', () => {
    server.close()
    logger.success('Server is running at http://' + ip + `:${port}`)
    startDevServer(port)
  })
  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      logger.warn('端口号被占用，修改端口号为' + port)
      listenPort(+port + 1)
    }
  })
}

function startDevServer (port) {
  const devServer = new WebpackServer(compiler, {
    open: true, // 自动打开浏览器
    host: ip, // ip
    publicPath: devConfig.output.publicPath,
    progress: true, // 将运行进度输出到控制台。
    compress: true, // 启用 gzip 压缩。
    // quiet: true,
    stats: 'errors-only',
    index: 'index.html', // 启动索引html文件,默认index.html
    hot: true, // 是否启用热替换
    hotOnly: true, // 启用热模块替换
    clientLogLevel: 'none', // 启用内联模式(inline mode)，会在控制台打印消息，用none阻止。
    inline: true, // dev-server 的两种不同模式之间切换：true内联模式(inline mode)、 false: iframe 模式，默认true。
    proxy: {
      '/mds': {
        target: 'http://192.168.0.172:8888/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/mds': ''
        }
      }
    }
  })
  devServer.listen(port)
}
listenPort(setting.port)
