const Facade = require('../../lib/facade')
const productLabelSchema = require('./schema')

class ProductLabelFacade extends Facade {}

module.exports = new ProductLabelFacade('ProductLabel', productLabelSchema)
