const mongoose = require('mongoose')
const Schema = mongoose.Schema

const languageSchema = new Schema({
  slug: {
    type: String,
    unique: true
  },
  name: String
})

module.exports = languageSchema