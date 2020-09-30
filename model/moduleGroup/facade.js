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
    async findByArea(area) {
        const requests = {
            product: {
                in_products: true
            },
            category: {
                in_categories: true
            },
          
        }
        const request = requests[area]
        const items = await this.Model.find(request)
        return items
    }
}

module.exports = new ModuleGroupFacade('ModuleGroup', moduleGroupSchema)
