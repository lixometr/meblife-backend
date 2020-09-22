const Facade = require('../../lib/facade')
const manufacturerSchema = require('./schema')

class ManufacturerFacade extends Facade {
    constructor(...atrs) {
        super(...atrs)
        this.fieldsToTranslate = ['name', 'slug', 'history', 'videos']
        this.relations = [
            {
                model: "Product",
                async resolver({id, model}) {
                    await model.updateMany({manufactrer: id}, {manufactrer: null}, {multi: true})
                }
            },
            {
                model: "Module",
                field: 'module_items.$[].item',
                async resolver({ model, id }) {
                   const result = await model.updateMany({}, { $pull: { 'module_items': { item: id } } }, { multi: true })
                }
            }
        ]
    }
}

module.exports = new ManufacturerFacade('Manufacturer', manufacturerSchema)
