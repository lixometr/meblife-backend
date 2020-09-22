const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const Translation = require('../Translation')
const manufacturerSchema = new Schema({
    name: [Translation],
    slug: [Translation],
    image: {
        type: Image,
        default: () => ({})
    },
    description: [Translation],
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
    videos: [Translation],
    history: [Translation],
    created_at: {
        type: Date,
        default: Date.now
    }
}, {minimize: false})

module.exports = manufacturerSchema
