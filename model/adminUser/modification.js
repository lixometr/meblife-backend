const Modification = require('../../lib/modification')
const facade = require('./facade')

class AdminUserModification extends Modification {
    translate() {
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    toINFO() {
        return {
            login: this.item.login,
            name: this.item.name
        }
    }
}
module.exports = AdminUserModification