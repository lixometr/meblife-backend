const Facade = require('../../lib/facade')
const promocodeSchema = require('./schema')

class PromocodeFacade extends Facade {
    constructor(...atrs) {
        super(...atrs)

    }
    async check(value) {
        const item = await this.Model.findOne({
            value
        })
        if(item) return true
        return false
    }
}

module.exports = new PromocodeFacade('Promocode', promocodeSchema)
