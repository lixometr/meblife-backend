const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const Translation = require('../Translation')
const manufacturerSchema = new Schema({
    name: [Translation],
    slug: [Translation],
    image: {
        type: Image,
        default: () => ({})
    },
    description: [Translation],
    headerImage: Image,
    history: [Translation],
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = manufacturerSchema
