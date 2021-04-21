const port = require('../project.config').port
const ip = require('ip').address()
const portIsOccupied = require('./portUsed')
const logger = require('./logger')
const open = require("open"); // 打开浏览器
logger.info('Starting server...')
portIsOccupied(port)
    .then((res) => {
        require('./server')
    })