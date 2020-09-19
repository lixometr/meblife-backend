const Modification = require('../../lib/modification')
const facade = require('./facade')
const moduleModification = require('../module/modification')
module.exports = class ModuleGroupModification extends Modification {

    translate() {
        if(!this.item) return this
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    async populateModules() {
        await this.mongooseItem.populate('modules').execPopulate()
        let modules = this.mongooseItem.modules
        const resolvers = modules.map(async theModule => {
            const instance = new moduleModification(theModule, this.options)
            await instance.init()
            return instance.toINFO()
        })
        modules = await Promise.all(resolvers)
        this.item.modules = modules
    }
    async init() {
        this.translate()
        await this.populateModules()
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            modules: this.item.modules
        }
    }

}