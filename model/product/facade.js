const Facade = require('../../lib/facade')
const ProductSchema = require('./schema')
const { at } = require('lodash')
class ProductFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name', 'slug', 'description']
        this.fieldsToPopulate = ['manufacturer',  'category', 'attributes.name', 'attributes.value', 'primary_category']

    }
    async populateFields(product) {
        this.fieldsToPopulate.forEach(async field => {
            await product.populate(field).execPopulate()
        })
        return product

    }
    async findById(...args) {
        const result = await super.findById(...args)
        return result
    }
    async getProductAttributesById(id) {
         /*
        [
            {
                name: "Some",
                attributes: [
                    {name: "some", value: "Some value"},
                    {}
                ]
            },
            {}
        ]
        */
        const product = await this.findById(id)
        await product.populate('attributes.name attributes.value').execPopulate()
        
        
    }
    async findByCategoryId(catId) {
        const inCategory = await this.Model.find({ 'category': catId })
        const inPrimaryCategory = await this.Model.find({ 'primary_category': catId })

        return [...inPrimaryCategory, ...inCategory]
    }


}

module.exports = new ProductFacade('Product', ProductSchema)
