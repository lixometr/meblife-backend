const Controller = require('../../lib/controller')
const productLabelFacade = require('./facade')

class ProductLabelController extends Controller {}

module.exports = new ProductLabelController(productLabelFacade)
