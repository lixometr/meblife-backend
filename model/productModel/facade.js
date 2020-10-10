const Facade = require('../../lib/facade')
const productModelSchema = require('./schema')

class ProductModel extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name', 'slug']
    }
}

module.exports = new ProductModel('ProductModel', productModelSchema)
