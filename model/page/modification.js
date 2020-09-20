const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class ManufacturerModification extends Modification {

    translate() {
        if(!this.item) return this
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    async init() {
        this.translate()
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            slug: this.item.slug,
            header_image: this.item.header_image || {},

        }
    }
    toFULL() {
        return {
            ...this.toINFO(),
            module_groups: this.item.module_groups
        }
    }

}