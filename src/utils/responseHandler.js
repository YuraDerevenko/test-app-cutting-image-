'use strict'

function responseHandler(req, res, next) {
    const successHttpCode = 200
    let status

    if (res.myResponse) {
        status = res.myStatus || successHttpCode
        return res.status(status).send(res.myResponse)
    }

    return next()
}

module.exports = responseHandler
