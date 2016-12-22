const im = require('imagemagick')
const Promise = require('bluebird')
const config = require('../../config')
const path = require('path')
const fs = require('fs')
const folderCreator = require('../utils/folderCreator')
const logger = require('../utils/logger')

function *cutAndSaveImage(vertical, horizontal, file) {
    const cuttingParameter = `${vertical}x${horizontal}`
    const totalParts = vertical * horizontal
    const nanoseconds = process.hrtime()
    const [originalName, extension] = file.originalFilename.split('.')
    const folderName = `${originalName}-${nanoseconds}`
    const filePath = `${path.join(config.PATH.root, config.PATH.imageFolder)}/${folderName}`

    try {
        yield folderCreator(filePath)
    } catch (ex) {
        logger.error('Create folder error : ', ex)
        throw ex
    }

    try {
        yield new Promise(function(resolve, reject) {
            im.convert([
                file.path,
                '-crop',
                `${cuttingParameter}@`,
                `${filePath}/${originalName}_%d.${extension}`
            ], function(err) {
                if (err) {
                    return reject(err)
                }
                resolve()
            })
        })
    } catch (ex) {
        logger.error('Save image error : ', ex)
        throw ex
    }

    return {
        totalParts,
        folderName,
        originalName,
        extension
    }
}

function *getImage(model, part) {
    const imageFolderPath = path.join(config.PATH.root, config.PATH.imageFolder)
    const { folderName } = model
    const fileName = `${model.originalName}_${part}.${model.extension}`

    return new Promise(function(resolve, reject) {
        let file = fs.createReadStream(`${imageFolderPath}/${folderName}/${fileName}`)

        return resolve(file)
    })
}

module.exports = {
    cutAndSaveImage,
    getImage
}
