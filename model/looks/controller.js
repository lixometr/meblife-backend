const Controller = require('../../lib/controller')
const looksFacade = require('./facade')

class LooksController extends Controller {}

module.exports = new LooksController(looksFacade)
