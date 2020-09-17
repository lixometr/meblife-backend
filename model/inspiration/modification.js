const Modification = require('../../lib/modification')
const facade = require('./facade')
const productModification = require('../product/modification')
const { times } = require('lodash')
module.exports = class InspirationModification extends Modification {

    translate() {
        if (!this.item) return this
        this.item = facade.translate(this.item, this.langId, this.defaultLangId)
        return this
    }
    async populateAll() {
        const fields = facade.fieldsToPopulate
        const popStr = fields.join(' ')
        await this.mongooseItem.populate(popStr).execPopulate()

        fields.forEach(field => {
            this.item[field] = this.mongooseItem[field]
        })
    }
    async initProducts() {
        const initier = async product => {
            const instance = new productModification(product, this.options)
            await instance.init()
            return instance.toINFO()
        }
        const resolvers1 = this.item.products1.map(initier)
        const resolvers2 = this.item.products2.map(initier)
        const resolvers3 = this.item.products3.map(initier)
        const products1 = await Promise.all(resolvers1)
        this.item.products1 = products1
        const products2 = await Promise.all(resolvers2)
        this.item.products2 = products2
        const products3 = await Promise.all(resolvers3)
        this.item.products3 = products3
    }
    async init() {
        await this.populateAll()
        this.translate()
        await this.initProducts()
    }
    toFULL() {
        return {
            _id: this.item._id,
            image: this.item.image || {},
            header_image: this.item.header_image || {},
            slug: this.item.slug,
            name: this.item.name,
            no_template: this.item.no_template,
            manufacturer: this.item.manufacturer,
            products1: this.item.products1 || [],
            products2: this.item.products2 || [],
            products3: this.item.products3 || [],
            introduction_text: this.item.introduction_text,
            introduction_title: this.item.introduction_title,
            first_block_introduction_text: this.item.first_block_introduction_text,
            first_block_introduction_title: this.item.first_block_introduction_title,
            first_block_image_left: this.item.first_block_image_left || {},
            first_block_image_right: this.item.first_block_image_right || {},
            second_block_introduction_text: this.item.second_block_introduction_text,
            second_block_introduction_title: this.item.second_block_introduction_title,
            second_block_image_left: this.item.second_block_image_left || {},
            second_block_image_right: this.item.second_block_image_right || {},
            separator_image: this.item.separator_image || {},
            module_groups: this.item.module_groups,
            created_at: this.item.created_at
        }
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            slug: this.item.slug,
            image: this.item.image || {},
        }
    }
    toADMIN() {
        return this.toFULL()
    }
}