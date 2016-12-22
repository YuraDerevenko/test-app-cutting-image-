const logger = require('../../utils/logger')
const Image = require('../image.model')

function *getAll(req, res, next) {
    let images

    try {
        images = yield Image.fetchAll()
    } catch (ex) {
        logger.error('Fetch images info error: ', ex)
        res.myStatus = 400
        return next(ex)
    }

    res.myResponse = images

    return next()
}

module.exports = getAll
