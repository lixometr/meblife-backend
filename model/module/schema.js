const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image');
const File = require('../File');
const Translation = require('../Translation');
const ModuleImage = new Schema ({
  image: Image,
  title: [Translation],
  sub_title: [Translation],
  description: [Translation],
  more_btn: [Translation],
  more_btn_url: [Translation]
})
const moduleSchema = new Schema({
  module_id: Number,
  module_items: [
    {
      type: {
        type: String
      },
      item: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  main_image: {
    type: Image,
    default: {}
  },
  color: String,
  bg_color: String,
  module_images: [ModuleImage],
  module_files: [File],
  sort_order: Number,
  cuntdown_start_at: Date,
  cuntdown_end_at: Date,
  title: [Translation],
  sub_title: [Translation],
  description: [Translation],
  more_btn: [Translation],
  more_btn_url: [Translation],
  show_type: String,
  created_at: {
    type: Date,
    default: Date.now
  }
}, {minimize: false})

module.exports = moduleSchema
