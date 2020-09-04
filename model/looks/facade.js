const Facade = require('../../lib/facade')
const looksSchema = require('./schema')
const productFacade = require('../product/facade')
class LooksFacade extends Facade {
    async findByProductId(id) {
        const items = await this.Model.find({products: id})
        return items
    }
    async findByCategoryId(id) {
        const products = await productFacade.findByPrimaryCategoryId(id)
        const productsIds = products.map(product => product._id)
        const items = await this.Model.find({products: {$in: productsIds}})
        return items
    }
}

module.exports = new LooksFacade('Looks', looksSchema)
