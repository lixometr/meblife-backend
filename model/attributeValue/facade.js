const Facade = require('../../lib/facade')
const attributeValueSchema = require('./schema')

class AttributeValueFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name', 'slug']
        this.relations = [{
            model: 'Product',
            field: "attributes.$[].value",
        }]
    }
}

module.exports = new AttributeValueFacade('AttributeValue', attributeValueSchema)
