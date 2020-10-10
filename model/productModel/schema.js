const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = require('../Translation');
const productModel = new Schema({
  name: [Translation],
  slug: [Translation],
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = productModel
