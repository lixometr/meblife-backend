const mongoose = require('mongoose')
const Schema = mongoose.Schema

const settingsSchema = new Schema({
  name: {
    type: String,
    index: true
  },
  value: {}
})

module.exports = settingsSchema