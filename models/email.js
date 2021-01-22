const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})
emailSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Email', emailSchema)