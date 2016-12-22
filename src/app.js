const express = require('express')
const fs = require('fs')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const logger = require('./utils/logger')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const config = require('./../config')


require('./db')
require('./utils/folderCreator')(path.join(config.PATH.root, config.PATH.imageFolder))

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(function(req, res, next) {
    res.on('finish', function() {
        if (req.files) {
            Object.keys(req.files).forEach(function(file) {
                logger.info(req.files[file].path)
                fs.unlink(req.files[file].path, function(err) {
                    if (err) {
                        logger.error(err)
                    }
                })
            })
        }
    })
    next()
})
express.app = app

app.use(require('./index'))

const server = http.Server(app)

server.listen(config.port)
logger.info(`Server listen on port ${config.port}`)

module.exports = app
