const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class CategoryModification extends Modification {

    translate() {
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            image: this.item.image,
            slug: this.item.slug,
        }
    }
    toADMIN() {
        return {
            _id: this.item._id,
            name: this.item.name,
            image: this.item.image || {},
            slug: this.item.slug,
            bg_image: this.item.bg_image || {},
            product_mask: this.item.product_mask,
            show_products: this.item.show_products,
            parent: this.item.parent,
            module_groups: this.item.module_groups,
            created_at: this.item.created_at
        }
    }
}