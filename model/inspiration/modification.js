const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class InspirationModification extends Modification {

    translate() {
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    toINFO() {
        return {
            _id: this.item._id,
            image: this.item.image,
            slug: this.item.slug,
        }
    }
}