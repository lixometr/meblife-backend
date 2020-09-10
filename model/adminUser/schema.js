const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminuserSchema = new Schema({
  name: String,
  login: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  }
})

module.exports = adminuserSchema
