const express = require("express"); // express框架
const path = require("path"); // 路径模块
const webpack = require('webpack')
const logger = require('./logger')
const setting = require('../project.config')
const webpackConfig = require('./webpack.config')
const compress = require('compression')
const proxy = require('http-proxy-middleware')
const { proxyApiPathArr, proxyHost } = setting

const app = express();
app.use(compress())





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