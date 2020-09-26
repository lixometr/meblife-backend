const Controller = require('../../lib/controller')
const orderFacade = require('./facade')
const Modification = require('./modification')

class OrderController extends Controller {
    async findByUserId(req, res, next) {
        try {
            const orders = await this.facade.findByUserId(req.user._id.toString())
            const resolvers = orders.map(async order => {
                const instance = new Modification(order, {
                    langId: req.request.language._id,
                    defaultLangId: req.settings.language._id,
                    currency: req.request.currency,
                    defaultCurrency: req.settings.currency,
                })
                await instance.init()
                return instance.toINFO()
            })
            const items = await Promise.all(resolvers)
            res.json(items)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new OrderController(orderFacade, Modification)
