const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const Modification = require('./modification')
const facade = require('./facade')

class PageController extends Controller {

}

module.exports = new PageController(facade, Modification)
