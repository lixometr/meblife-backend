const Facade = require('../../lib/facade')
const AttributeGroup = require('./schema')

class AttributeGroupController extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name',]
        this.relations = [
            {
                model: "Attribute",
                async resolver({id, model}) {
                    const result = await model.deleteMany({groupId: id})
                    return result
                }
            }
        ]
    }

    
}

module.exports = new AttributeGroupController('AttributeGroup', AttributeGroup)
