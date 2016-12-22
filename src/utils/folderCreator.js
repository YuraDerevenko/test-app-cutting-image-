const exec = require('child_process').exec
const logger = require('./logger')
const Promise = require('bluebird')

module.exports = function(folderPath) {
    return new Promise(function(resolve, reject) {
        exec(`mkdir -p ${folderPath}`, function(err) {
            if (err) {
                logger.error(err)
                return reject(err)
            }
            logger.info('Created image Folder')
            logger.info('At path : ', folderPath)
            resolve()
        })
    })
}
