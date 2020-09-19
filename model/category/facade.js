const Facade = require('../../lib/facade')
const categorySchema = require('./schema')
// const productFacade = require('../product/facade')
const mongoose = require('mongoose')
class CategoryFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name', 'slug', 'product_mask']
        this.relations = [
            {
                model: "Product",
                async resolver({ id, model }) {
                    await model.updateMany({ category: id }, { $pull: { category: id } }, { multi: true })
                    await model.updateMany({ primary_category: id }, { primary_category: null }, { multi: true })
                }
            },
            {
                model: "Category",
                async resolver({id, model}) {
                    await model.updateMany({parent: id}, {parent: null}, {multi: true})
                }
            },
            {
                model: "Module",
                field: 'module_items.$[].item',
            }
        ]
    }

    async findParentsById(id) {
        const findParent = async (startId, arr) => {
            if (!arr) arr = []
            const category = await this.Model.findById(startId)
            if (category) {
                arr.unshift(category)
            }
            if (category.parent) {
                await findParent(category.parent, arr)
            }
            return arr
        }
        const arrayOfParents = await findParent(id)
        return arrayOfParents
    }
    async findChildrenById(id) {
        const arrayOfChildren = await this.Model.find({ parent: id })

        return arrayOfChildren
    }
    async findAllChildrenById(id) {
        const findChildren = async (startId, result) => {
            if (!result) result = {}
            const children = await this.findChildrenById(startId)
            const cat = await this.findById(startId)
            result.category = cat.toJSON()
            result.children = children.map(child => ({ category: child, children: [] }))
            for (let i = 0; i < children.length; i++) {
                const child = children[i]
                await findChildren(child._id, result.children[i])
            }
            return result
        }
        const childrenList = await findChildren(id)
        return childrenList
    }
    async findWithoutParent() {
        const items = await this.Model.find({ parent: null })
        return items;
    }

}

module.exports = new CategoryFacade('Category', categorySchema)
