const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  order_id: String,
  status: Number,
  delivery_status: Number,
  isAuthorized: Boolean,
  user: {
    ref: "User",
    type: Schema.Types.ObjectId
  },
  products: [
    {
      ref: "Product",
      type: Schema.Types.ObjectId
    }
  ],
  total_sum: Number,
  currency: {
    ref: "Currency",
    type: Schema.Types.ObjectId
  },
  currency_symbol: String,
  used_promocodes: [
    {
      ref: "Promocode",
      type: Schema.Types.ObjectId
    }
  ],
  delivery_address: {
    name: String,
    street: String,
    address: String,
    postal_code: String,
    city: String,
    phone: String,
    note: String,
  },
  payment_method: String,

  delivery_method: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = orderSchema
