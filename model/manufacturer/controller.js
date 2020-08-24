const Controller = require('../../lib/controller')
const manufacturerFacade = require('./facade')

class ManufacturerController extends Controller {}

module.exports = new ManufacturerController(manufacturerFacade)
