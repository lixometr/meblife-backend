const Facade = require('../../lib/facade')
const ProductSchema = require('./schema')
class ProductFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name', 'slug', 'description']
        this.fieldsToPopulate = ['manufacturer', 'labels', 'category', 'attributes.name', 'attributes.value', 'primary_category']
     
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
    async findBySlug(slug) {
        const product = await this.Model.findOne({slug})
        return product
    }
    async findByCategoryId(catId) {
        const inCategory = await this.Model.find({ 'category._id': catId })
        const inPrimaryCategory = await this.Model.find({ 'primary_category': catId })

        return [...inPrimaryCategory, ...inCategory]
    }
    // Делаеть разные версии продукта (вырезает ненужные поля)
    async trimTo(item, type) {
        if(type === 'all') {
            item.category.map(cat => ({_id: cat._id, name: cat.name, slug: cat.slug}))
        }
        if(type === '') {

        }
    }

}

module.exports = new ProductFacade('Product', ProductSchema)
