const Controller = require('../../lib/controller')
const CurrencyFacade = require('./facade')
const AppError = require('../../helpers/error')
const Modification = require('./modification')

class CurrencyController extends Controller {
    async findAll(req, res, next) {
        try {
            const currencies = await this.facade.findAll()
            if(!currencies) throw new AppError(404)
            const resolvers = currencies.map(async currency => {
                const instance = new Modification(currency, {
                    langId: req.request.language._id,
                    defaultLangId: req.settings.defaultLangId
                })
                if(req.adminUser) {
                    return instance.toADMIN()
                }
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

module.exports = new CurrencyController(CurrencyFacade, Modification)
