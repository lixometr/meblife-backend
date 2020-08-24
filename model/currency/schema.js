const mongoose = require('mongoose')
const Schema = mongoose.Schema

const currencySchema = new Schema({
  k: Number,
  name: String,
  slug: String,
  format: String,
})

module.exports = currencySchema
