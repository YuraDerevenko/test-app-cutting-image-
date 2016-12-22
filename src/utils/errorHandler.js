const logger = require('./logger')

function errorHandler(err, req, res, next) {
    const errHttpCode = 500

    const status = err.status || res.myStatus || errHttpCode
    const responseBody = err.message || err.name

    logger.error(err.message || err)
    res.status(status).send(responseBody)
}

module.exports = errorHandler
