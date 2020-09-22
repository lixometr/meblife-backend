const Modification = require('../../lib/modification')
const productModification = require('../product/modification')
module.exports = class UserModification extends Modification {
    constructor(...args) {
        super(...args)
    }
    async initFavourite() {
        await this.mongooseItem.populate('favourite').execPopulate()
        const favourites = this.mongooseItem.favourite
        const resolvers = favourites.map(async product => {
            const instance = new productModification(product, this.options)
            await instance.init()
            return instance.toINFO()
        })
        const items = await Promise.all(resolvers)
        this.item.favourite = items
    }
    async init() {

    }
    toINFO() {
        return {
            _id: this.item._id,
            email: this.item.email,
            name: this.item.name,
            phone: this.item.phone,
            active: this.item.active,
            role: this.item.role,
            delivery_adresses: this.item.delivery_adresses,
            invoice_addresses: this.item.invoice_addresses,
        }
    }

}