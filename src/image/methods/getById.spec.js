const App = require('./../../app')
const API = require('co-supertest')(App.listen())

const ObjectId = require('mongoose').Types.ObjectId
const Promise = require('bluebird')
const _ = require('lodash')
const chai = require('chai')
const expect = chai.expect

const Faker = require('faker')

const Image = require('../image.model')

describe('get image', () => {
    const id = ObjectId()
    const route = `/image/${id}`
    let filesInfo
    let files

    function generateFiles(imId, n) {
        let parts = []

        for (n; n--;) {
            parts.push(`http://localhost:3000/image/${imId}/${n}`)
        }
        return parts
    }

    beforeEach(function *() {
        filesInfo = {
            _id : id,
            totalParts : Faker.random.number({
                min : 1,
                max : 5
            }),
            originalName : Faker.lorem.word(),
            folderName : Faker.lorem.word(),
            extension : Faker.lorem.word()
        }
        files = generateFiles(id, filesInfo.totalParts)

        yield Promise.all([
            Image.origin.collection.remove({}),
            Image.origin.collection.insert(filesInfo)
        ])
    })

    it('works fine', function *() {
        const ImageModel = this.sandbox.spy(Image, 'fetchFullById')

        const resp = yield API
            .get(route)
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .end()
        const data = resp.body

        expect(ImageModel).calledOnce

        expect(data).to.be.an('object')
        expect(data._id).eql(`${id}`)
        expect(data.files).eql(files)
    })

    it('fails retrieve model', function *() {
        const ImageModel = this.sandbox.stub(Image, 'fetchFullById').returnsWithReject(new Error('EXCEPTION'))

        const resp = yield API
            .get(route)
            .send()
            .expect(400)
            .end()

        expect(ImageModel).calledOnce
    })
})
