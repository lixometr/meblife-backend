const Controller = require('../../lib/controller')
const manufacturerFacade = require('./facade')
const AppError = require('../../helpers/error')
const Modification = require('./modification')

class ManufacturerController extends Controller {
  
}

module.exports = new ManufacturerController(manufacturerFacade, Modification)
