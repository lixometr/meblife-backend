const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Translation = require('../Translation');
const Image = require('../Image');
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


const currencySchema = new Schema({
  currencyId: {
    type: Schema.Types.ObjectId,
    ref: "ProductCurrency"
  },
  value: String
})
const ProductSchema = new Schema({
  name: [Translation],
  description: [Translation],
  price: [currencySchema],
  old_price: [currencySchema],
  is_available: Boolean,
  available_stock: Number,
  available_stock_manufacturer: Number,
  delivery_costs: Number,
  // Разобраться с доставкой (привезем получите)
  order_until: Date,
  delivery_at: String,
  delivery_days: Number,

  slug: {
    type: [Translation],
    index: true
  },
  sku: String,
 
  // Акции
  promotion: {
    promotion_type: String,
    promotion_value: String,
    end_at: Date
  },
  // Метки
  labels: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductLabel"
    }
  ],
  default_image: Image,
  size_image: Image,
  feature_images: [Image],
  product_images: [Image],

  // Модификации продукта (одинаковые продукты, но с разными атрибутами)
  product_modifications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  attributes: [
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
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer"
  },
  primary_category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category"
    }
  ],

  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }

})

module.exports = ProductSchema
