const facade = require('./facade')
const Modification = require('../../lib/modification')
const AttributeModification = require('../attribute/modification')
const AttributeValueModification = require('../attributeValue/modification')
const CategoryModification = require('../category/modification')
const ManufacturerModification = require('../manufacturer/modification')
const AttributeGroupModification = require('../attributeGroup/modification')
const LabelModification = require('../productLabel/modification')
const ProductModelModification = require('../productModel/modification')
module.exports = class ProductModification extends Modification {
    constructor(item, options) {
        super(item, options)
        
    }

    async makeTitle() {
        const cat = this.item.primary_category || {}
        const mask = cat.product_mask || ''
        const attrs = this.item.attributes
        const matches = mask.match(/\{\{.+?\}\}/gi)
        let newName = mask
        if (!matches) {
            this.item.full_name = mask
        }
        // pre make array of values
        const allValues = {}
        // attribues
        attrs.forEach(attr => {
            
            const values = attr.value.reduce((str, val, idx) => {
                str += val.name
                if (idx < attr.value.length - 1) {
                    str += ', '
                }
                return str
            }, '')
            allValues[attr.name.slug.toLowerCase()] = values
        })
        allValues['name'] = this.item.name
        allValues['sku'] = this.item.sku
        allValues['manufacturer'] = this.item.manufacturer && this.item.manufacturer.name
        allValues['label'] = this.item.labels.reduce((str, val, idx) => {
            str += val.name
            if (idx < this.item.labels.length - 1) {
                str += ', '
            }
            return str
        },'')
        if (matches) {
            matches.forEach(match => {
                let slug = match.toLowerCase()
                slug = slug.replace('{{', '').replace('}}', '')
                const value = allValues[slug]

                if (value) {
                    newName = newName.replace(match, value)
                }

            })
        }
        // Убираем незамененые маски
        newName = newName.replace(/\{\{.+?\}\}/g, '')
        this.item.full_name = newName

    }

    translate() {
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
    }
    async populateAll() {
        const populateStr = facade.fieldsToPopulate.join(' ')
        await this.mongooseItem.populate(populateStr).execPopulate()
        this.item = this.mongooseItem.toJSON()
    }
    translateAll() {
        this.item.attributes = this.item.attributes.map(attr => {
            const name = new AttributeModification(attr.name, this.options).translate().toJSON()
            const value = attr.value.map(val => {
                return new AttributeValueModification(val, this.options).translate().toJSON()
            })
            return { name, value }
        })
        this.item.manufacturer = new ManufacturerModification(this.item.manufacturer, this.options).translate().toJSON()
        this.item.primary_category = new CategoryModification(this.item.primary_category, this.options).translate().toJSON()
        this.item.model = new ProductModelModification(this.item.model, this.options)
        this.item.category = this.item.category.map(cat => new CategoryModification(cat, this.options).translate().toJSON())
        this.item.labels = this.item.labels.map(label => new LabelModification(label, this.options).translate().toJSON())
    }
    async init() {
        await this.populateAll()
        this.translate()
        this.translateAll()

        await this.makeTitle()
        this.calculatePrice()

    }
    calculatePrice() {
        const currency = this.options.currency
        const defaultCurrency = this.options.defaultCurrency
        if(currency._id.toString() === defaultCurrency._id.toString()) return
        let price = this.item.price * currency.k
        let oldPrice = this.item.old_price * currency.k
        this.item.price = Math.round(price)
        this.item.old_price = Math.round(oldPrice)
    }
    async groupAttrs() {
        /*
        [
            {
                name: "Some",
                attributes: [
                    {name: "some", value: "Some value"},
                    {}
                ]
            },
            {}
        ]
        */
        await this.mongooseItem.populate('attributes.name.groupId').execPopulate()
        let attributes = this.mongooseItem.attributes
        const groupAttrs = []
        attributes.map(attr => {

            const groupName = new AttributeGroupModification(attr.name.groupId, this.options).translate().toJSON()
            const itemIdx = groupAttrs.findIndex(grAttr => grAttr.name.toLowerCase() === groupName.name.toLowerCase())

            if (itemIdx < 0) {
                groupAttrs.push({
                    name: groupName.name,
                    attributes: [{
                        name: new AttributeModification(attr.name, this.options).translate().toJSON(),
                        value: attr.value.map(val => new AttributeValueModification(val, this.options).translate().toJSON())
                    }]
                })
            } else {
                groupAttrs[itemIdx].attributes.push({
                    name: new AttributeModification(attr.name, this.options).translate().toJSON(),
                    value: attr.value.map(val => new AttributeValueModification(val, this.options).translate().toJSON())
                })
            }
        })
        this.item.attributes = groupAttrs
    }
    toJSON() {
        return this.item
    }
    toINFO() {
        return {
            _id: this.item._id,
            full_name: this.item.full_name,
            name: this.item.name,
            price: this.item.price,
            old_price: this.item.old_price,
            available_stock: this.item.available_stock,
            available_stock_manufacturer: this.item.available_stock_manufacturer,
            is_available: this.item.is_available,
            slug: this.item.slug,
            promotion: this.item.promotion,
            category: this.item.category || [],
            labels: this.item.labels,
            default_image: this.item.default_image,
            product_modifications: this.item.product_modifications,
            manufacturer: new ManufacturerModification(this.item.manufacturer).toINFO(),
            primary_category: new CategoryModification(this.item.primary_category).toINFO(),
            created_at: this.item.created_at,
            order_until: this.item.order_until,
            delivery_at: this.item.delivery_at,
            delivery_days: this.item.delivery_days,
            delivery_24: this.item.delivery_24,
            attributes: this.item.attributes,
            product_files: this.item.product_files || [],
            model: this.item.model
        }
    }


}