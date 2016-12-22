const logger = require('../../utils/logger')
const Image = require('../image.model')

function *getById(req, res, next) {
    const { id } = req.params
    let image

    try {
        image = yield Image.fetchFullById(id)
    } catch (ex) {
        logger.error('Fetch image info error: ', ex)
        res.myStatus = 400
        return next(ex)
    }

    res.myResponse = image

    return next()
}

module.exports = getById
