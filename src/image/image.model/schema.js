const Schema = require('mongoose').Schema

const schema = new Schema({
    extension : {
        type : String,
        default : ''
    },
    folderName : {
        type : String,
        default : ''
    },
    originalName : {
        type : String,
        default : ''
    },
    totalParts : {
        type : Number,
        default : 1
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
})

module.exports = schema
