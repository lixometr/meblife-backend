const Facade = require('../../lib/facade')
const { use } = require('../user/router')
const orderSchema = require('./schema')

class OrderFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
    async findByUserId(userId) {
        return this.Model.find({
            user: userId
        })
    }
}

module.exports = new OrderFacade('Order', orderSchema)
