const Facade = require('../../lib/facade')
const CurrencySchema = require('./schema')

class CurrencyFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = ['name']
    }
    async findBySlug(slug) {
        const item = await this.Model.findOne({ slug })
        return item
    }

}

module.exports = new CurrencyFacade('Currency', CurrencySchema)
