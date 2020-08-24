const Facade = require('../../lib/facade')
const moduleGroupSchema = require('./schema')

class ModuleGroupFacade extends Facade {}

module.exports = new ModuleGroupFacade('ModuleGroup', moduleGroupSchema)
