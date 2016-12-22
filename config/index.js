const config = {}

// for example NODE_ENV is development
config.env = process.env.NODE_ENV || 'development'
config.isTest = process.env.NODE_ENV === 'test'

config.host = process.env.HOST || 'http://localhost'
config.port = process.env.PORT || 3000

// database mongodb
config.dbHost = process.env.DB_HOST || '127.0.0.1'
config.dbPort = process.env.DB_PORT || 27017
config.dbName = process.env.DB_NAME || 'cutting-app'
config.mongodbUri = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`

// folders
config.PATH = {
    root : process.cwd(),
    imageFolder : '../images',
    docs : '/api_docs/api.html',
    coverage : '/coverage/lcov-report'
}

// for test env
if (config.isTest) {
    config.mongodbUri = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}-test`
    config.PATH.imageFolder = '../images-test'
}
module.exports = config;
