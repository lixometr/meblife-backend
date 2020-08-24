const Controller = require('../../lib/controller')
const moduleFacade = require('./facade')

class ModuleController extends Controller {}

module.exports = new ModuleController(moduleFacade)
