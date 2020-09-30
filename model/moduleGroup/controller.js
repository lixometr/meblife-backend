const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const moduleGroupFacade = require('./facade')
const Modification = require('./modification')

class ModuleGroupController extends Controller {
    async findByArea(req, res, next) {
        try {
            const allowedAreas = ['product', 'category', ]
            const area = req.params.area
            if (!allowedAreas.includes(area)) return res.json([])
            const moduleGroups = await this.facade.findByArea(area)
            const resolvers = moduleGroups.map(async item => {
                const instance = new Modification(item, {
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

module.exports = new ModuleGroupController(moduleGroupFacade, Modification)
