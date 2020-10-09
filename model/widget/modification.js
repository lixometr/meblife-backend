const Modification = require('../../lib/modification')
const { getLangText } = require('../../helpers/functions')

const facade = require('./facade')
const _ = require('lodash')
module.exports = class WidgetModificatin extends Modification {
    constructor(...args) {
        super(...args)
        this.schema = {}
    }
    translate() {
        if(!this.item) return this
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    translateField(item) {
        return getLangText(this.langId, this.defaultLangId)(item)
    }
    async init() {
        this.item = _.merge({}, this.schema, this.item)
        this.translate()
    }
    toJSON() {
        return _.merge({}, this.schema, this.item)
    }
  

}