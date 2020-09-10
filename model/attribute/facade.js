const Facade = require('../../lib/facade')
const Attribute = require('./schema')
const attributeValueFacade = require('../attributeValue/facade')

class AttributeController extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name', 'slug']
    }
    async findById(id) {
        const attribute = await this.Model.findById(id)
        return attribute;
    }
    async findValuesById(id) {
        const attribute = await this.findById(id)
        if(!attribute) return []
        const values = await attributeValueFacade.find({ attributeId: attribute._id.toString() })
        return values
    }

}

module.exports = new AttributeController('Attribute', Attribute)
