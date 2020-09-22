const Controller = require('../../lib/controller')
const orderFacade = require('./facade')

class OrderController extends Controller {}

module.exports = new OrderController(orderFacade)
