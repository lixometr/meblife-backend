const Facade = require('../../lib/facade')
const moduleGroupSchema = require('./schema')

class ModuleGroupFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name']
    }
}

module.exports = new ModuleGroupFacade('ModuleGroup', moduleGroupSchema)
