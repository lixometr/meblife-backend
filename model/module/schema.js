const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image');
const File = require('../File');
const Translation = require('../Translation');
const ModuleImage = {
  image: Image,
  texts: {
    title: [Translation],
    description: [Translation],
    more_btn: [Translation],
    more_btn_url: [Translation]
  }
}
const moduleSchema = new Schema({
  module_number: Number,
  module_items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  main_image: Image,
  module_images: [ModuleImage],
  module_files: [File],
  sort_order: Number,
  cuntdown_start_at: Date,
  cuntdown_end_at: Date,
  module_texts: {
    title: [Translation],
    sub_title: [Translation],
    description: [Translation],
    more_btn: [Translation],
    more_btn_url: [Translation]
  }
})

module.exports = moduleSchema
