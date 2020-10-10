const Controller = require('../../lib/controller')
const productLabelFacade = require('./facade')
const Modification = require('./modification')
class ProductModel extends Controller {}

module.exports = new ProductModel(productLabelFacade, Modification)
