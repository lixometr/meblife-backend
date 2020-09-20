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
  // Выводить списком дочерние категории
  show_category_grid: {
    type: Boolean,
    default: false
  },
  module_groups_top: [{
    type: Schema.Types.ObjectId,
    ref: "ModuleGroup"
  }],
  module_groups_bottom: [{
    type: Schema.Types.ObjectId,
    ref: "ModuleGroup"
  }],
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
}, {minimize: false})


module.exports = categorySchema
