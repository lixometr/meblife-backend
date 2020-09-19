const Controller = require('../../lib/controller')
const moduleGroupFacade = require('./facade')
const Modification = require('./modification')

class ModuleGroupController extends Controller {
    
}

module.exports = new ModuleGroupController(moduleGroupFacade, Modification)
