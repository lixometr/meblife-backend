const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = require('../Translation');
const Image = require('../Image');
const categorySchema = new Schema({
  name: [Translation],
  image: {
    type: Image,
    default: () => ({})
  },
  bg_image: {
    type: Image,
    defualt: () => ({})
  },
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
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})


module.exports = categorySchema
