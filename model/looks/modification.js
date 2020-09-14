const Modification = require('../../lib/modification')
const facade = require('./facade')
const ProductModification = require('../product/modification')
module.exports = class LooksModification extends Modification {

    translate() {
        if (!this.item) return this
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    async populateAll() {
        await this.mongooseItem.populate('products').execPopulate()
        this.item.products = this.mongooseItem.products
    }
    async init() {
        await this.populateAll()
        const resolvers = this.item.products.map(async product => {
            const instance = new ProductModification(product, this.options)
            await instance.init()
            return instance.toINFO()
        })
        const products = await Promise.all(resolvers)
        this.item.products = products
    }
    toINFO() {
        return {
            _id: this.item._id,
            image: this.item.image || {},
            products: this.item.products  || []
        }
    }

}