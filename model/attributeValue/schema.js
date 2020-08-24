const mongoose = require('mongoose')
const Translation = require('../Translation')
const Schema = mongoose.Schema

const attributeValueSchema = new Schema({
  name: [Translation],
  slug: [Translation],
  attributeId: {
    type: Schema.Types.ObjectId,
    ref: "Attribute"
  }
})

module.exports = attributeValueSchema
