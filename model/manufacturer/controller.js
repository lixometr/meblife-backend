const Controller = require('../../lib/controller')
const manufacturerFacade = require('./facade')
const AppError = require('../../helpers/error')
const Modification = require('./modification')

class ManufacturerController extends Controller {
    async findAll(req, res, next) {
        try {
            let items = await this.facade.findAll()
            const resolvers = items.map(async item => {
                const instance = new Modification(item, {
                    langId: req.request.language._id,
                    defaultLangId: req.settings.language._id
                })
                await instance.init()
                return instance.toINFO()
            })
            items = await Promise.all(resolvers)
            res.json(items)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new ManufacturerController(manufacturerFacade, Modification)
