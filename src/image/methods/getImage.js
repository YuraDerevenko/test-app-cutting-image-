const logger = require('../../utils/logger')
const Image = require('../image.model')
const ImageHandler = require('../../adapters/image')

function *getImage(req, res, next) {
    const { download } = req.query
    const { id, partId } = req.params
    let image

    try {
        image = yield Image.fetchById(id)
    } catch (ex) {
        logger.error('Fetch image info error: ', ex)

        return next(ex)
    }

    let file

    try {
        file = yield ImageHandler.getImage(image, partId)
    } catch (ex) {
        logger.error('Fetch image info error: ', ex)

        return next(ex)
    }

    if (download) {
        res.setHeader('Content-disposition', `attachment; filename=${image.originalName}_${partId}.${image.extension}`)
    }
    file.pipe(res)
}

module.exports = getImage
