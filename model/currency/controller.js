const Controller = require('../../lib/controller')
const CurrencyFacade = require('./facade')
const AppError = require('../../helpers/error')

class CurrencyController extends Controller {
    async findAll(req, res, next) {
        try {
            const items = await this.facade.find()
            if (!items) throw new AppError(404)
            res.json(items)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CurrencyController(CurrencyFacade)
