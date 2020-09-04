const Facade = require('../../lib/facade')
const productLabelSchema = require('./schema')

class ProductLabelFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name', 'slug']
    }
}

module.exports = new ProductLabelFacade('ProductLabel', productLabelSchema)
