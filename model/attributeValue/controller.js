const Controller = require('../../lib/controller')
const attributeValueFacade = require('./facade')
const Modification = require('./modification')

class AttributeValueController extends Controller {
    async findAll(req, res, next) {
        try {
            const attrs = await this.facade.findAll()
            const resolvers = attrs.map(async attr => {
                const instance =  new Modification(attr, { langId: req.request.language._id, defaultLangId: req.request.language._id })
                await instance.init()
                return instance.toINFO()
            })
            const items = await Promise.all(resolvers)
            res.json(items)
        } catch (err) {
            next(err)
        }
    }
    async findById(req, res, next) {
        try {
            const attribute = await this.facade.findById(req.params.id)
            if (!attribute) throw new AppError(404)
            const instance = new Modification(attribute, { langId: req.request.language._id, defaultLangId: req.request.language._id })
            await instance.init()
            res.json(instance.toINFO())
        } catch (err) {
            next(err)
        }
    }
    async findBySlug(req, res, next) {
        try {
            const attribute = await this.facade.findBySlug(req.params.slug, req.request.language.id)
            const instance = new Modification(attribute, { langId: req.request.language._id, defaultLangId: req.request.language._id })
            await instance.init()
            res.json(instance.toINFO())
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AttributeValueController(attributeValueFacade)
