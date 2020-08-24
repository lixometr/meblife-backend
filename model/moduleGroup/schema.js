const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moduleGroupSchema = new Schema({
  modules: [{
    type: Schema.Types.ObjectId,
    ref: "Module"
  }]
})

module.exports = moduleGroupSchema
