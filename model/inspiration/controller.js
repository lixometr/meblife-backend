const Controller = require('../../lib/controller')
const inspirationFacade = require('./facade')
const Modification = require('./modification')

class InspirationController extends Controller {}

module.exports = new InspirationController(inspirationFacade, Modification)
