const Controller = require('../../lib/controller')
const inspirationFacade = require('./facade')

class InspirationController extends Controller {}

module.exports = new InspirationController(inspirationFacade)
