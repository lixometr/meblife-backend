const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String }
})

module.exports = authSchema
