const mongoose = require('mongoose')
const Schema = mongoose.Schema

const languageSchema = new Schema({
  slug: String,
  name: String
})

module.exports = languageSchema
