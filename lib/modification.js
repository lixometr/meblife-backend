const Facade = require('./facade')
module.exports = class Modification {
    constructor(item, options = {}) {
        this.options = options
        if (item._doc) {
            this.item = item._doc
            this.mongooseItem = item
        } else {
            this.item = item
        }
        this.defaultLangId = options.defaultLangId
        this.langId = options.langId

    }


    translate() {
        this.item = Facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    async init() {
        this.translate()
    }
    full() {
        return this.item
    }
    toJSON() {
        return this.item
    }
    toString() {
        return this.toJSON()
    }
}