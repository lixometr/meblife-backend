const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = require('../Translation');
const Image = require('../Image');
const File = require('../File');
/*
available: true
available_stock: 8
available_stock_manufacturer: 10
default_image: {id: 478,…}
delivery_at: "2020-08-24"
delivery_costs: 0
delivery_customer_at: "2020-08-26"
delivery_days: 9
delivery_methods: [{module_group_id: null, delivery_method_texts: [{,…}], __typename: "DeliveryMethod"},…]
ean: "4250243539829"
embed_code_3d: null
embed_code_video: null
embed_link_3d: null
embed_link_video: null
exact_promotion_end_at: "Invalid date"
featured_product_images: null
flags: null
id: 181
manufacturer: {id: 3, delivery_days: 10,…}
module_groups_bottom: []
module_groups_default: []
module_groups_top: []
order_until: "2020-08-16"
package_weight: 20
percentage_reduction: null
price_gross: 54897
price_unpromoted: 78424
primary_category: {id: 9, name: "Biurka", slug_full: "/c/biurka", __typename: "ProductPrimaryCategory"}
product_files: []
product_number: "i20999"
product_texts: [{id: 361, name: "Biurko White Desk II", slug_full: "/p/biurko-white-desk-ii",…}]
product_type: "default"
promotion: {promotion_type: 1, promotion_value: 30, end_at: "2020-08-16 23:59:00", __typename: "Promotion"}
promotion_stock: "all"
rating: null
sellable_stock: 3
size_images: [{id: 485,…}]
sku: "463"
*/

const Promotion = new Schema({
  value: Number,
  end_at: Date
})
const ProductSchema = new Schema({
  name: [Translation],
  description: [Translation],
  // если цены больше чем 500, то доставка бесплатная
  price: Number,
  old_price: Number,
  is_available: Boolean,
  // Если тут не 0, то доставка 24 часа
  available_stock: {
    type: Number,
    default: 0
  },
  available_stock_manufacturer: {
    type: Number,
    default: 0
  },
  // Дата отправки (просто дата)
  order_until: Date,
  // Кол-во дней доставки: delivery_at - Date.now()
  delivery_at: Date,
  slug: {
    type: [Translation],
    index: true
  },
  sku: String,

  // Акции
  promotion: {
    type: Promotion,
    default: () => ({})
  },
  // Метки
  labels: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductLabel"
      }
    ],
    default: () => ([])
  },
  default_image: {
    type: Image,
    default: () => ({})
  },
  size_image: Image,
  feature_images: [Image],
  product_images: [Image],

  // Модификации продукта (одинаковые продукты, но с разными атрибутами)
  product_versions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  attributes: {
    type: [
      {
        name: {
          type: Schema.Types.ObjectId,
          ref: "Attribute"
        },
        value: [{
          type: Schema.Types.ObjectId,
          ref: "AttributeValue"
        }]
      }
    ],
    default: () => ([])
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
  },
  primary_category: {
    type: Schema.Types.ObjectId,
    ref: "Category",

  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category"
    }
  ],
  product_files: [File],
  module_groups_bottom: [
    {
      ref: "ModuleGroup",
      type: Schema.Types.ObjectId
    }
  ],
  module_groups_top: [
    {
      ref: "ModuleGroup",
      type: Schema.Types.ObjectId
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  product_number: String,
  product_suplier_number: String,
  ean: String,
  mpn: String,
  asin: String,
  embed_3d: String,
  embed_video: String,
  price_buy: String,
  price_rrp: String
}, { toJSON: { virtuals: true } })

ProductSchema.virtual('delivery_days').get(function () {
  if (!this.delivery_at) return
  const diff = this.delivery_at.getTime() - new Date().getTime()
  const days = Math.round(diff / (1000 * 60 * 60 * 24))
  return days.toString()
})
ProductSchema.virtual('delivery_24').get(function () {
  if (this.available_stock) return true
  return false
})
ProductSchema.virtual('free_delivery').get(function () {
  if (this.price < 500) return true
  return false
})

module.exports = ProductSchema
