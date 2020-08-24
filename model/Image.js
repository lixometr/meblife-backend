const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = new Schema({
    url: String
})

module.exports = Image
