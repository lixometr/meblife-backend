const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const looksSchema = new Schema({
  image: {
    type: Image,
    default: () => ({})
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = looksSchema
