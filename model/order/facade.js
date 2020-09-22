const Facade = require('../../lib/facade')
const orderSchema = require('./schema')

class OrderFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
}

module.exports = new OrderFacade('Order', orderSchema)
