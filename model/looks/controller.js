const Controller = require('../../lib/controller')
const looksFacade = require('./facade')

class LooksController extends Controller {
    getByProductSlug(req, res, next) {

    }
    getByManufacturerSlug(req, res, next) {

    }
    
}

module.exports = new LooksController(looksFacade)
