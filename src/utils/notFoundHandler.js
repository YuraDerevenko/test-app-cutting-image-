function notFound(req, res, next) {
    let body

    res.status(404)

    switch (req.headers['content-type']) {
        case 'text/html':
            body = '<p>Page Not Found</p>'
            break
        case 'application/json':
            body = {
                message : 'Page Not Found'
            }
            break
        default:
            body = 'Page Not Found'
    }

    return res.send(body)
}

module.exports = notFound
