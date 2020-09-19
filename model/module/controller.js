const Controller = require('../../lib/controller')
const moduleFacade = require('./facade')
const Modification = require('./modification')


class ModuleController extends Controller {}

module.exports = new ModuleController(moduleFacade, Modification)
