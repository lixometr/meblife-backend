const mongoose = require('mongoose')
const Translation = require('../Translation')
const Schema = mongoose.Schema

const attributeValueSchema = new Schema({
  name: [Translation],
  slug: [Translation],
  attributeId: {
    index: true,
    type: Schema.Types.ObjectId,
    ref: "Attribute"
  }
})

module.exports = attributeValueSchema
