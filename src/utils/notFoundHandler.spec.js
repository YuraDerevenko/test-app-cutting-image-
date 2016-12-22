'use strict'

const request = require('co-supertest')
const expect = require('chai').expect

const server = require('./../server')

describe('GET non-existent-route', () => {
    const route = '/non-existent-route'

    it('should get not found', function *() {
        const resp = yield request(server.listen())
            .get(route)
            .send()
            .expect(404)
            .end()

        expect(resp.text).to.be.eql('Page Not Found')
    })

    it('should get not found', function *() {
        const resp = yield request(server.listen())
            .get(route)
            .set('Content-Type', 'application/json')
            .send()
            .expect(404)
            .expect('Content-Type', /json/)
            .end()

        expect(resp.body).to.be.eql({
            message : 'Page Not Found'
        })
    })

    it('should get not found', function *() {
        const resp = yield request(server.listen())
            .get(route)
            .set('Content-Type', 'text/html')
            .send()
            .expect(404)
            .expect('Content-Type', /html/)
            .end()

        expect(resp.text).to.be.eql('<p>Page Not Found</p>')
    })
})
