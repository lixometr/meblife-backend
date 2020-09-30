const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class PromocodeModification extends Modification {

    translate() {
        if(!this.item) return this
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    async init() {
        this.translate()
    }
  
}