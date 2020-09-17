const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class LabelModification extends Modification {

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
        }
    }

}