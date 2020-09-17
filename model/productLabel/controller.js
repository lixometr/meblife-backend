const Controller = require('../../lib/controller')
const productLabelFacade = require('./facade')
const Modification = require('./modification')
class ProductLabelController extends Controller {}

module.exports = new ProductLabelController(productLabelFacade, Modification)
