const mongoose = require('mongoose')
const Translation = require('../Translation')
const Schema = mongoose.Schema
const moduleGroupSchema = new Schema({
  name: [Translation],
  in_categories: {
    type: Boolean,
    default: false
  },
  in_products: {
    type: Boolean,
    default: false
  },
 
  sort_order: Number,
  modules: [{
    type: Schema.Types.ObjectId,
    ref: "Module"
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = moduleGroupSchema
