const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DeliveryAddress = new Schema({
  name: String,
  address: String,
  postal_code: String,
  city: String,
  phone: String,
  note: String,
  is_default: Boolean
})
const Invoice = new Schema({
  company: String,
  nip: String,
  phone: String,
  postal_code: String,
  city: String,
  is_default: Boolean,
  note: String
})
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },

  name: String,
  phone: String,
  confirm_key: String,
  is_confirmed: {
    type: Boolean,
    default: false
  },
  active: Boolean,
  role: String,
  favourite: [
    {
      ref: "Product",
      type: Schema.Types.ObjectId
    }
  ],
  delivery_adresses: [
    DeliveryAddress
  ],
  invoice_addresses: [
    Invoice
  ],
  // languageId: String,
  // currencyId: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = userSchema
