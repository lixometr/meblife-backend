const Facade = require('../../lib/facade')
const manufacturerSchema = require('./schema')

class ManufacturerFacade extends Facade {
    constructor(...atrs) {
        super(...atrs)
        this.fieldsToTranslate = ['name', 'slug']
        this.relations = [
            {
                model: "Product",
                async resolver({id, model}) {
                    await model.updateMany({manufactrer: id}, {manufactrer: null}, {multi: true})
                }
            }
        ]
    }
}

module.exports = new ManufacturerFacade('Manufacturer', manufacturerSchema)
