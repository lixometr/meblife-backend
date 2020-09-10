const Controller = require('../../lib/controller')
const authFacade = require('./facade')

class AuthController extends Controller {}

module.exports = new AuthController(authFacade)
