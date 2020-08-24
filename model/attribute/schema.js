const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = require('../TranslationSchema')
const AttributeSchema = new Schema({
  name: [Translation],
  values: [
    {
      type: Schema.Types.ObjectId,
      ref: "AttributeValue"
    }
  ],
  // decimal - range slider, values - обычное значение
  attribute_type: {
    type: String
  },
  slug: [Translation]
})

module.exports = AttributeSchema
