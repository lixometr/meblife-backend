const Facade = require('../../lib/facade')
const userSchema = require('./schema')

class AttributeController extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name', 'slug']
    }
    async findById(id) {
        const attribute = await this.Model.findById(id);
        return attribute;
    }
}

module.exports = new AttributeController('User', userSchema)
