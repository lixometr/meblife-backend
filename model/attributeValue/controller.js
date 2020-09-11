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

}

module.exports = new AttributeValueController(attributeValueFacade, Modification)
