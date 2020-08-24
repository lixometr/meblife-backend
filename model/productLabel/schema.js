const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = require('../Translation');
const productLabelSchema = new Schema({
  color: String,
  background_color: String,
  text: [Translation],
  slug: [Translation]
})

module.exports = productLabelSchema
