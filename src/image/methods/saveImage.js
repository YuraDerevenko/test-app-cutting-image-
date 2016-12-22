const logger = require('../../utils/logger')
const Image = require('../image.model')
const ImageHandler = require('../../adapters/image')
const _ = require('lodash')
const validate = require('../../utils/payloadValidate')
const schema = require('../image.validation-schema').createImage

function *saveImage(req, res, next) {
    let payload = req.body

    payload.files = _.values(req.files)

    let data

    try {
        data = yield validate(payload, schema)
    } catch (ex) {
        logger.error('Validation error', ex)
        res.myStatus = 400
        return next(ex)
    }

    let fileMetaData
    let files = []

    for (const file of data.files) {
        try {
            fileMetaData = yield ImageHandler.cutAndSaveImage(data.vertical_parts, data.horizontal_parts, file)
            files.push(fileMetaData)
        } catch (ex) {
            logger.error('Save file error : ', ex)
            res.myStatus = 400
            return next(ex)
        }
    }

    let image

    try {
        image = yield Image.create(files)
    } catch (ex) {
        logger.error('Save image info error: ', ex)
        res.myStatus = 400
        return next(ex)
    }

    res.myResponse = image
    res.myStatus = 201

    return next()
}

module.exports = saveImage
