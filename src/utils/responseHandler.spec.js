'use strict'

const request = require('co-supertest')
const expect = require('chai').expect

const server = require('./../server')
const pkg = require('./../../package.json')

describe('Handle success request', () => {
    const route = '/'

    it('should handle success', function *() {
        const resp = yield request(server.listen())
            .get(route)
            .send()
            .expect(200)
            .end()

        expect(resp.body).to.be.eql({ name : pkg.name })
    })
})
