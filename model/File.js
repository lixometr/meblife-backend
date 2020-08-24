const mongoose = require('mongoose')
const Schema = mongoose.Schema

const File = new Schema({
    path: String,
    name: String  
})

module.exports = File
