const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class ManufacturerModification extends Modification {

    translate() {
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            slug: this.item.slug,
            image: this.item.image,
        }
    }
}