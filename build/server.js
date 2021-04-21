const express = require("express"); // express框架
const path = require("path"); // 路径模块
const webpack = require('webpack')
const logger = require('./logger')
const setting = require('../project.config')
const webpackDevConfig = require('./webpack.dev.config')
const compress = require('compression')
const proxy = require('http-proxy-middleware')
const { proxyApiPathArr, proxyHost, env } = setting

const app = express();
app.use(compress()); //启用压缩

if (env === 'development') {
    const compiler = webpack(webpackDevConfig);
    logger.info('Enabling webpack development and HMR middleware')
    const devMiddleware = require("webpack-dev-middleware")(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        // mimeTypes?, writeToDisk?, methods?, headers?, publicPath?, stats?, serverSideRender?, outputFileSystem?, index?
    });
    const hotMiddleware = require("webpack-hot-middleware")(compiler, {
        path: '/__webpack_hmr',
        reload: true,
        quiet: false,
        noInfo: true,
        log: false,
        heartbeat: 2000,
    });
    app.use(devMiddleware)
    app.use(hotMiddleware)
    app.use(express.static(path.resolve(setting.basePath, 'public')))
    // 代理  跨域
    // proxyApiPathArr.map((v) => {
    //     app.use(proxy(`/${v}`, { target: proxyHost, changeOrigin: true }))
    // })
    app.use('*', function (req, res, next) {
        const filename = path.join(compiler.outputPath, 'index.html')
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err)
            }
            res.set('content-type', 'text/html')
            res.send(result)
            res.end()
        })
    })
} else {
    logger.warn(
        'Server is being run outside of live development mode, meaning it will ' +
        'only serve the compiled application bundle in ~/dist. Generally you ' +
        'do not need an application server for this and can instead use a web ' +
        'server such as nginx to serve your static files. See the "deployment" ' +
        'section in the README for more information on deployment strategies.'
    )
    app.use(express.static(path.resolve(setting.basePath, setting.outDir)))
}

module.exports = app



// 
// 
// const webpack = require("webpack"); //核心模块webpack
// const ip = require("ip").address()

// const webpackConfig = require("./webpack.dev.config"); // 配置文件

// const port = webpackConfig.devServer.port;

// 
// const compiler = webpack(webpackConfig);

// var devMiddleware = require("webpack-dev-middleware")(compiler, {
//   publicPath: webpackConfig.output.publicPath,
//   //   quiet: true
// });

// var hotMiddleware = require("webpack-hot-middleware")(compiler, {
//   log: false,
//   heartbeat: 2000,
// });

// app.use(require("connect-history-api-fallback")());
// //开启 支持history路由

// app.use(devMiddleware); // 服务器webpack插件

// app.use(hotMiddleware); // 热加载自动打包

// app.use("/static", express.static("./static"));

// var uri = "http://" + ip + ':' + port;

// var _resolve;
// var readyPromise = new Promise((resolve) => {
//   _resolve = resolve;
// });

// console.log("> Starting dev server...");
// devMiddleware.waitUntilValid(() => {
//   console.log("> Listening at " + uri + "\n");

//   if (process.env.NODE_ENV !== "testing") {
//     open(uri);
//   }
//   _resolve();
// });

// var server = app.listen(port);

// module.exports = {
//   ready: readyPromise,
//   close: () => {
//     server.close();
//   },
// };