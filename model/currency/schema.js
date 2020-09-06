const mongoose = require('mongoose')
const Translation = require('../Translation')
const Schema = mongoose.Schema

const currencySchema = new Schema({
  k: Number,
  name: [Translation],
  slug: {
    type: String,
    unique: true
  },
  symbol: String,
})

module.exports = currencySchema
