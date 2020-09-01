const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const Translation = require('../Translation')
const manufacturerSchema = new Schema({
    name: [Translation],
    slug: [Translation],
    image: Image,
    description: [Translation],
    headerImage: Image,
    history: [Translation]
})

module.exports = manufacturerSchema
