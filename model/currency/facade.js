const Facade = require('../../lib/facade')
const CurrencySchema = require('./schema')

class CurrencyFacade extends Facade {
    async findBySlug(slug) {
        return this.Model.findOne({slug});
    }
}

module.exports = new CurrencyFacade('Currency', CurrencySchema)
