const App = require('./../../app')
const API = require('co-supertest')(App.listen())

const path = require('path')
const chai = require('chai')
const expect = chai.expect

const Faker = require('faker')

const config = require('../../../config')
const Image = require('../image.model')
const ImageHandler = require('../../adapters/image')

describe('save image', () => {
    let credentials
    const route = '/image'
    let filesInfo
    let vertical
    let horizontal

    beforeEach(function *() {
        vertical = Faker.random.number({
            min : 1,
            max : 5
        })
        horizontal = Faker.random.number({
            min : 1,
            max : 5
        })
        filesInfo = {
            totalParts : vertical * horizontal,
            originalName : Faker.lorem.word(),
            folderName : Faker.lorem.word(),
            extension : Faker.lorem.word()
        }
    })

    it('works fine', function *() {
        const ImageHandlerStub = this.sandbox.spy(ImageHandler, 'cutAndSaveImage')
        const resp = yield API
            .post(route)
            .field('vertical_parts', vertical)
            .field('horizontal_parts', horizontal)
            .attach('file', path.join(config.PATH.root, '/src/fixtures/test-image.jpg'))
            .send()
            .expect(201)
            .expect('Content-Type', /json/)
            .end()
        const data = resp.body

        expect(ImageHandlerStub).calledOnce

        expect(data).to.be.an('array')
        expect(data[0]).to.have.property('_id')
        expect(data[0].totalParts).eql(filesInfo.totalParts)
    })

    it('fails because service returns rejection', function *() {
        const ImageHandlerStub = this.sandbox.stub(ImageHandler, 'cutAndSaveImage').returnsWithReject(new Error('EXCEPTION'))

        const resp = yield API
            .post(route)
            .field('vertical_parts', Faker.random.number())
            .field('horizontal_parts', Faker.random.number())
            .attach('file', path.join(config.PATH.root, '/src/fixtures/test-image.jpg'))
            .send(credentials)
            .expect(400)
            .end()

        expect(ImageHandlerStub).calledOnce
    })

    it('fails save model', function *() {
        const ImageHandlerStub = this.sandbox.stub(ImageHandler, 'cutAndSaveImage').returnsWithResolve(filesInfo)
        const ImageModel = this.sandbox.stub(Image, 'create').returnsWithReject(new Error('EXCEPTION'))

        const resp = yield API
            .post(route)
            .field('vertical_parts', Faker.random.number())
            .field('horizontal_parts', Faker.random.number())
            .attach('file', path.join(config.PATH.root, '/src/fixtures/test-image.jpg'))
            .send()
            .expect(400)
            .end()

        expect(ImageHandlerStub).calledOnce
        expect(ImageModel).calledOnce
    })

    it('fails validation', function *() {
        const ImageHandlerStub = this.sandbox.spy(ImageHandler, 'cutAndSaveImage')
        const ImageModel = this.sandbox.spy(Image, 'create')

        const resp = yield API
            .post(route)
            .field('vertical_parts', Faker.random.number())
            .field('horizontal_parts', Faker.random.number())
            .send()
            .expect(400)
            .end()
        const data = resp.body

        expect(ImageModel).not.called
        expect(ImageHandlerStub).not.called
    })
})
