const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = require('../Translation')
const manufacturerSchema = new Schema({
    value: String,
    created_at: {
        type: Date,
        default: Date.now
    }
}, { minimize: false })

module.exports = manufacturerSchema
