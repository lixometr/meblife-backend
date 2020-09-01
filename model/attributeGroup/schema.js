const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = require('../Translation')
const AttributeGroup = new Schema({
  name: [Translation],
})



module.exports = AttributeGroup
