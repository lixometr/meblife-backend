const Controller = require('../../lib/controller')
const moduleGroupFacade = require('./facade')

class ModuleGroupController extends Controller {}

module.exports = new ModuleGroupController(moduleGroupFacade)
