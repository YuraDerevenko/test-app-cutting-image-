const mongoose = require('mongoose')
const schema = require('./schema')
const _ = require('lodash')
const config = require('../../../config')

const model = mongoose.model('image', schema)

const Image = {
    origin : model,
    create : function(data) {
        return model.create(data)
    },
    fetchAll : function() {
        return model.find()
    },
    fetchById : function(id) {
        return model.findById(id).lean()
    },
    fetchFullById : function(id) {
        return model.findById(id, {
            __v : 0,
            folderName : 0
        }).lean()
            .then(image => {
                image.files = []

                for (let i = image.totalParts; i--;) {
                    image.files.push(`${config.host}:${config.port}/image/${image._id}/${i}`)
                }
                return image
            })
    }
}

module.exports = Image
