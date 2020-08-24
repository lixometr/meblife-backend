const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inspirationSchema = new Schema({
  module_groups: {
    type: Schema.Types.ObjectId,
    ref: "ModuleGroup"
  }
})

module.exports = inspirationSchema
