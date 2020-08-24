const Controller = require('../../lib/controller')
const CurrencyFacade = require('./facade')

class CurrencyController extends Controller {}

module.exports = new CurrencyController(CurrencyFacade)
