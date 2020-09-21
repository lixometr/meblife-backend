const Facade = require('../../lib/facade')
const inspirationSchema = require('./schema')
const productFacade = require('../product/facade')
class InspirationFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = [
            'name',
            'slug',
            'introduction_text',
            'introduction_title',
            'first_block_introduction_text',
            'first_block_introduction_title',
            'second_block_introduction_text',
            'second_block_introduction_title'
        ]
        this.fieldsToPopulate = ['products1', 'products2', 'products3','manufacturer']
    }
    async findByProductId(id) {
        const items = await this.Model.find({
            $or: [
                { products1: id },
                { products2: id },
                { products3: id }
            ]
        })
        return items
    }
    async findByCategoryId(id) {
        const products = await productFacade.findByPrimaryCategoryId(id)
        const productsIds = products.map(product => product._id)
        const items = await this.Model.find({
            $or: [
                { products1: { $in: productsIds } },
                { products2: { $in: productsIds } },
                { products3: { $in: productsIds } }
            ]
        })
        return items
    }
    async findByManufacturerId(id) {
        const products = await productFacade.findByManufacturerId(id)
        const productsIds = products.map(product => product._id)
        // Или переделать под
        // this.Model.find({
        //     manufacturer: id
        // })

        const items = await this.Model.find({
            $or: [
                { products1: { $in: productsIds } },
                { products2: { $in: productsIds } },
                { products3: { $in: productsIds } }
            ]
        })
        return items
    }
}

module.exports = new InspirationFacade('Inspiration', inspirationSchema)
