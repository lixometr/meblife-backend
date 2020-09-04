const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const looksSchema = new Schema({
  image: Image,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
})

module.exports = looksSchema
