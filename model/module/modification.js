const Modification = require('../../lib/modification')
const facade = require('./facade')
const _ = require('lodash')
const productModification = require('../product/modification')
const categoryModification = require('../category/modification')
const manufacturerModification = require('../manufacturer/modification')

module.exports = class ModuleModification extends Modification {

    translate() {
        if (!this.item) return this
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    async populateItems() {
        let items = this.item.module_items
        if (!_.isArray(items) || _.isEmpty(items)) return
        const resolvers = items.map(async moduleItem => {
            const model = moduleItem.type
            const id = moduleItem.item
            let item = {}
            item = await facade.findByIdUsingModel(id.toString(), model)
            const ret = {
                _id: moduleItem._id,
                type: moduleItem.type,
                item
            }
            // console.log(ret)
            return ret
        })

        items = await Promise.all(resolvers)

        this.item.module_items = items
        console.log(this.item.module_items)
    }
    async initItems() {
        let items = this.item.module_items
        if (!_.isArray(items) || _.isEmpty(items)) return
        console.log(items)
        const resolvers = items.map(async item => {
            let initItem = {}
            if (item.type === 'Product') {
                const instance = new productModification(item.item, this.options)
                await instance.init()
                initItem = instance.toINFO()
            }
            if (item.type === 'Category') {
                const instance = new categoryModification(item.item, this.options)
                await instance.init()
                initItem = instance.toINFO()
            }
            if (item.type === 'Manufacturer') {
                const instance = new manufacturerModification(item.item, this.options)
                await instance.init()
                initItem = instance.toINFO()
            }
            return {
                ...item,
                item: initItem
            }
        })
        items = await Promise.all(resolvers)
        this.item.module_items = items

    }
    async init() {
        this.translate()

        await this.populateItems()
        await this.initItems()
    }
    toINFO() {
        return {
            _id: this.item._id,
            module_id: this.item.module_id,
            module_items: this.item.module_items,
            main_image: this.item.main_image,
            module_images: this.item.module_images || [],
            module_files: this.item.module_files,
            sort_order: this.item.sort_order,
            cuntdown_start_at: this.item.cuntdown_start_at,
            cuntdown_end_at: this.item.cuntdown_end_at,
            title: this.item.title,
            sub_title: this.item.sub_title,
            description: this.item.description,
            more_btn: this.item.more_btn,
            more_btn_url: this.item.more_btn_url,
            show_type: this.item.show_type,
            created_at: this.item.created_at,
        }
    }

}