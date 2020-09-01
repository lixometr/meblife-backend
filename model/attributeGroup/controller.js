const Controller = require('../../lib/controller')
const AttributeGroupFacade = require('./facade')
const Modification = require('./modification')
class AttributeGroupController extends Controller {

    async findBySlug(req, res, next) {
        try {
            const AttributeGroup =  await this.facade.findBySlug(req.params.slug)
            const instance = new Modification(AttributeGroup)
            await instance.init()
            res.json(instance.full())
        } catch(err) {
            next(err)
        }
    }
}


module.exports = new AttributeGroupController(AttributeGroupFacade)
