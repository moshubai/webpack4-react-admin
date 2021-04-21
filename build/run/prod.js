const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const logger = require('../logger')
const webpackProdConfig = require('../webpack.prod.config')
const setting = require('../../project.config')


const runWebpackCompiler = (wkConfig) => {
  return new Promise((resolve, reject) => {
    webpack(wkConfig).run((err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }
      const jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.')
        logger.log(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.')
        logger.log(jsonStats.warnings.join('\n'))
      }
      resolve(stats)
    })
  })
}
const compile = () => Promise.resolve()
  .then(() => logger.info('Starting compiler...'))
  .then(() => logger.info('Target application environment: ' + chalk.bold(setting.env)))
  .then(() => runWebpackCompiler(webpackProdConfig))
  .then(stats => {
    logger.info(`Copying static assets from ./public to ./${setting.outDir}.`)
    fs.copySync(
      path.resolve(setting.basePath, 'public'),
      path.resolve(setting.basePath, setting.outDir)
    )
    return stats
  })
  .then((stats) => {
    if (setting.verbose) {
      logger.log(stats.toString({
        colors: true,
        chunks: false,
      }))
    }
    logger.success(`Compiler finished successfully! See ./${setting.outDir}.`)
  })
  .catch((err) => logger.error('Compiler encountered errors.', err))
compile()


