const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Transation = require('../Translation')
const Image = require('../Image')
const pageSchema = new Schema({
  name: [Transation],
  slug: [Transation],
  header_image: {
    type: Image,
    default: () => ({})
  },
  module_groups: [
    {
      ref: "ModuleGroup",
      type: Schema.Types.ObjectId
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = pageSchema