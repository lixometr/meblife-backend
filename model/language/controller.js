const Controller = require('../../lib/controller')
const languageFacade = require('./facade')

class LanguageController extends Controller {
    async find(req, res, next) {
        try {
            const items = await this.facade.find()
            if (!items) throw new AppError(404)
            res.json(items)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new LanguageController(languageFacade)
