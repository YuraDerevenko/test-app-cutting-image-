const Joi = require('joi')

const createImage = Joi.object().keys({
    vertical_parts : Joi.number().integer().greater(0).default(1),
    horizontal_parts : Joi.number().integer().greater(0).default(1),
    files : Joi.array().min(1)
})

module.exports = {
    createImage
}
