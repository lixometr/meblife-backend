const Controller = require('../../lib/controller')
const attributeFacade = require('./facade')
const Modification = require('./modification')
const AppError = require('../../helpers/error')
const AttributeValueModification = require('../attributeValue/modification')
class AttributeController extends Controller {
    // create(req, res, next ){ {
    //     console.log(10)
    // }}
    async findValuesById(req, res, next) {
        try {
            const attr = await this.facade.findById(req.params.id)
            if (!attr) throw new AppError(404)
            const attributeValues = await this.facade.findValuesById(req.params.id)
            const resolvers = attributeValues.map(async attrValue => {
                const instance = new AttributeValueModification(attrValue, { langId: req.request.language._id, defaultLangId: req.request.language._id })
                await instance.init()
                return instance.toINFO()
            })
            const items = await Promise.all(resolvers)
            res.json(items)
        } catch (err) {
            next(err)
        }
    }
    async findValuesBySlug(req, res, next) {
        try {
            const attribute = await this.findBySlug(req.params.slug)
            if (!attribute) throw new AppError(404)
            req.params.id = attribute._id
            await this.findValuesById(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}


module.exports = new AttributeController(attributeFacade, Modification)
