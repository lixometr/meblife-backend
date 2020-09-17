const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const Translation = require('../Translation')
const inspirationSchema = new Schema({
  header_image: Image,
  slug: [Translation],
  name: [Translation],
  image: Image,
  no_template: Boolean,
  manufacturer: { ref: "Manufacturer", type: Schema.Types.ObjectId },
  products1: [{ ref: "Product", type: Schema.Types.ObjectId }],
  products2: [{ ref: "Product", type: Schema.Types.ObjectId }],
  products3: [{ ref: "Product", type: Schema.Types.ObjectId }],
  introduction_text: [Translation],
  introduction_title: [Translation],
  first_block_introduction_text: [Translation],
  first_block_introduction_title: [Translation],
  first_block_image_left: Image,
  first_block_image_right: Image,

  second_block_introduction_text: [Translation],
  second_block_introduction_title: [Translation],
  second_block_image_left: Image,
  second_block_image_right: Image,
  separator_image: Image,
  module_groups: {
    type: Schema.Types.ObjectId,
    ref: "ModuleGroup"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = inspirationSchema
