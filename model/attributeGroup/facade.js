const Facade = require('../../lib/facade')
const AttributeGroup = require('./schema')

class AttributeGroupController extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name',]
    }

    
}

module.exports = new AttributeGroupController('AttributeGroup', AttributeGroup)
