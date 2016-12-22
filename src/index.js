const express = require('express')
const router = express.Router()
const app = express.app
const path = require('path')

const config = require('./../config')
const pkg = require('./../package.json')

app.get('/', function(req, res, next) {
    res.myResponse = {
        name : pkg.name
    }

    next()
})

app.use('/image', require('./image/image.router'))

app.use('/docs', express.static(path.join(config.PATH.root, config.PATH.docs)))
app.use('/coverage', express.static(path.join(config.PATH.root, config.PATH.coverage)))

app.use(require('./utils/responseHandler'))
app.use(require('./utils/notFoundHandler'))
app.use(require('./utils/errorHandler'))

module.exports = router
