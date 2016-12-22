'use strict'

const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const logger = require('./utils/logger')
const winston = require('winston')
const nock = require('nock')
const config = require('./../config')
const exec = require('child_process').exec
const path = require('path')

before(function() {
    chai.use(sinonChai)

    // do not log in test env.
    logger.remove(winston.transports.Console)

    sinon.stub.returnsWithResolve = function(data) {
        return this.returns(Promise.resolve(data))
    }

    sinon.stub.returnsWithReject = function(err) {
        return this.returns(Promise.reject(err))
    }
})

beforeEach(function() {
    this.sandbox = sinon.sandbox.create()
})

afterEach(function() {
    this.sandbox.restore()
    nock.cleanAll()
})

after(function() {
    exec(`rm -rf ${path.join(config.PATH.root, config.PATH.imageFolder)}`)
})
