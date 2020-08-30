const Facade = require('./facade')
module.exports = class Modification {
    constructor(item, options) {
        this.item = item._doc ? item._doc : item
        this.defaultLangId = options.defaultLang
        this.langId = options.lang
        this._translate()
        this.makeTitle()

    }

    async makeTitle() {
        // this.item.name
        await this.item.populate('primary_category').execPopulate()
        const mask = this.item.primary_category.product_mask
        const attrs = this.item.attributes
        const matches = mask.match(/\{\{(<?name>.+)\}\}/)
        matches.forEach(match => {
            const name = match.name.toLowerCase()  
            const attr = attrs.find(attr => attr.name.name === name)
        })
    }
    _translate() {
        this.item = this.facade.translate(this.item, this.langId, this.defaultLangId)
    }
    async init() {
        await this.makeTitle()
    }
    full() {
        return this.item
    }
    
}