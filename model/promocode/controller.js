const Controller = require('../../lib/controller')
const promocodeFacade = require('./facade')
const AppError = require('../../helpers/error')
const Modification = require('./modification')

class PromocodeController extends Controller {
    async check(req, res, next) {
        try {
            const promo = req.body.promocode
            const result = await this.facade.check(promo)
            res.json({ exists: result })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new PromocodeController(promocodeFacade, Modification)
