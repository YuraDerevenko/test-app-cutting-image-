const express = require('express')
const router = express.Router()
const wrap = require('co-express')

const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

router.get('/', function(req, res) {
    res.json({
        name : 'image-module'
    })
})

router.post('/', multipartMiddleware, wrap(require('./methods/saveImage')))

router.get('/:id([0-9a-fA-F]{24})', wrap(require('./methods/getById')))
router.get('/:id([0-9a-fA-F]{24})/:partId([0-9]{1,})', wrap(require('./methods/getImage')))
router.get('/list', wrap(require('./methods/getAll')))

module.exports = router
