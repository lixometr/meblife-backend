const Facade = require('../../lib/facade')
const moduleGroupSchema = require('./schema')

class ModuleGroupFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name']
        this.relations = [
            {
                model: "Product",
                field: 'module_groups_top'
            },
            {
                model: "Product",
                field: 'module_groups_bottom'
            },
            {
                model: "Category",
                field: 'module_groups_top'
            },
            {
                model: "Category",
                field: 'module_groups_bottom'
            },
            {
                model: "Inspiration",
                field: 'module_groups'
            },
            
        ]
    }
}

module.exports = new ModuleGroupFacade('ModuleGroup', moduleGroupSchema)
