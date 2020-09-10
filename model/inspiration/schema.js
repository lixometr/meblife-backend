const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const Translation = require('../Translation')
const inspirationSchema = new Schema({
  header_image: Image, 
  slug: [Translation],
  module_groups: {
    type: Schema.Types.ObjectId,
    ref: "ModuleGroup"
  }
})

module.exports = inspirationSchema
