const Facade = require('./facade')
module.exports = class Modification {
    constructor(item, options) {
        this.item = item._doc ? item._doc : item
        this.defaultLangId = options.defaultLang
        this.langId = options.lang
        this._translate()

    }

   
    _translate() {
        this.item = Facade.translate(this.item, this.langId, this.defaultLangId)
    }
    async init() {
this._translate()
    }
    full() {
        return this.item
    }

}