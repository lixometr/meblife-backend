const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = new Schema({
    langId: {
        type: Schema.Types.ObjectId,
        ref: "Language"
    },
    value: String
})

module.exports = Translation
