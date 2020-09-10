const Controller = require('../../lib/controller')
const adminuserFacade = require('./facade')

class AdminuserController extends Controller {}

module.exports = new AdminuserController(adminuserFacade)
