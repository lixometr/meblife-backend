const Facade = require('../../lib/facade')
const manufacturerSchema = require('./schema')

class ManufacturerFacade extends Facade {
    constructor(...atrs) {
        super(...atrs)
        this.fieldsToTranslate = ['name', 'slug']
    }
}

module.exports = new ManufacturerFacade('Manufacturer', manufacturerSchema)
