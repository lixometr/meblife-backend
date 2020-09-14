const Controller = require('../../lib/controller')
const looksFacade = require('./facade')
const productFacade = require('../product/facade')
const categoryFacade = require('../category/facade')
const Modification = require('./modification')

class LooksController extends Controller {
    async findByProductSlug(req, res, next) {
        try {
            const product = await productFacade.findBySlug(req.params.slug, req.request.language._id)
            const items = await this.facade.findByProductId(product._id.toString())
            const resolvers = items.map(async item => {
                const instance = new Modification(item, { 
                    langId: req.request.language._id, 
                    defaultLangId: req.settings.language._id,
                    currency: req.settings.currency,
                    defaultCurrency: req.settings.currency,
                 })
                await instance.init()
                return instance.toINFO()
            })
            const toSend = await Promise.all(resolvers)
            res.json(toSend)
        } catch (err) {
            next(err)
        }
    }
    async findByCategorySlug(req, res, next) {
        try {
            const category = await categoryFacade.findBySlug(req.params.slug, req.request.language._id)
            const items = await this.facade.findByCategoryId(category._id.toString())
            const resolvers = items.map(async item => {
                const instance = new Modification(item, { 
                    langId: req.request.language._id, 
                    defaultLangId: req.settings.language._id,
                    currency: req.settings.currency,
                    defaultCurrency: req.settings.currency,
                 })
                await instance.init()
                return instance.toINFO()
            })
            const toSend = await Promise.all(resolvers)
            res.json(toSend)
        } catch (err) {
            next(err)
        }
    }
    getByManufacturerSlug(req, res, next) {

    }

}

module.exports = new LooksController(looksFacade, Modification)
