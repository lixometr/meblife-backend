const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class CategoryModification extends Modification {

    translate() {
        if(!this.item) return this
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
    toFULL () {
        return {
            ...this.toINFO(),
            bg_image: this.item.bg_image,
            module_groups_top: this.item.module_groups_top,
            module_groups_bottom: this.item.module_groups_bottom,
            show_products: this.item.show_products  
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
            module_groups_top: this.item.module_groups_top,
            module_groups_bottom: this.item.module_groups_bottom,
            created_at: this.item.created_at
        }
    }
}