const App = require('./../../app')
const API = require('co-supertest')(App.listen())

const Promise = require('bluebird')
const _ = require('lodash')
const chai = require('chai')
const expect = chai.expect

const Faker = require('faker')

const Image = require('../image.model')

describe('get all images', () => {
    const route = '/image/list'
    let filesInfo

    beforeEach(function *() {
        filesInfo = {
            totalParts : Faker.random.number(),
            originalName : Faker.lorem.word(),
            folderName : Faker.lorem.word(),
            extension : Faker.lorem.word()
        }

        yield Promise.all([
            Image.origin.collection.remove({}),
            Image.origin.collection.insert(filesInfo)
        ])
    })

    it('works fine', function *() {
        const ImageModel = this.sandbox.spy(Image, 'fetchAll')

        const resp = yield API
            .get(route)
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .end()
        const data = resp.body

        expect(ImageModel).calledOnce

        expect(data).to.be.an('array')
        expect(data.length).eql(1)
        expect(data[0]).to.have.property('_id')
    })

    it('fails retrieve models', function *() {
        const ImageModel = this.sandbox.stub(Image, 'fetchAll').returnsWithReject(new Error('EXCEPTION'))

        const resp = yield API
            .get(route)
            .send()
            .expect(400)
            .end()

        expect(ImageModel).calledOnce
    })
})
