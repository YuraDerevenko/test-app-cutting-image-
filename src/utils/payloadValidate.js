'use strict'

const logger = require('./../utils/logger')
const Joi = require('joi')
const _ = require('lodash')
const thunkify = require('thunkify')
const joiValidate = thunkify(Joi.validate)

function *payloadValidator(data, schema) {
    let body

    try {
        body = yield joiValidate(data, schema, {
            stripUnknown : true,
            convert : true,
            abortEarly : false
        })
    } catch (ex) {
        ex.message = _.head(ex.details).message
        logger.error('Invalid payload:', ex.details)
        throw ex
    }

    return body
}

module.exports = payloadValidator
