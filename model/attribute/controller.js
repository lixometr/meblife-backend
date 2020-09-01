const Controller = require('../../lib/controller')
const attributeFacade = require('./facade')
const Modification = require('./modification')
class AttributeController extends Controller {
    // create(req, res, next ){ {
    //     console.log(10)
    // }}
    async findBySlug(req, res, next) {
        try {
            const attribute =  await this.facade.findBySlug(req.params.slug)
            const instance = new Modification(attribute)
            await instance.init()
            res.json(instance.full())
        } catch(err) {
            next(err)
        }
    }
}


module.exports = new AttributeController(attributeFacade)
