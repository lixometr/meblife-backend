const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = require('../Translation');
const Image = require('../Image');
const Modification = require('./modification')
const categorySchema = new Schema({
  name: [Translation],
  image: Image,
  bg_image: Image,
  slug: {
    type: [Translation],
    index: true,
  },
  product_mask: [Translation],
  // Выводить продукты?
  show_products: {
    type: Boolean,
    default: true
  },
  module_groups: {
    type: Schema.Types.ObjectId,
    ref: "ModuleGroup"
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    default: () => null
  }
})


module.exports = categorySchema
