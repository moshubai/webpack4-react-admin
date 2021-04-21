const setting = require('../../project.config')
const portIsOccupied = require('../portUsed')
const logger = require('../logger')
const open = require("open"); // 打开浏览器
logger.info('Starting server...')

portIsOccupied(setting.port)
    .then((res) => {
        require('../server').listen(res, () => {
            logger.success('Server is running at http://' + setting.ip.address() + `:${res}`)
            open('http://' + setting.ip.address() + `:${res}`)
        })
    })