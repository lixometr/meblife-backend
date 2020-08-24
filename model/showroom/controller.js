const Controller = require('../../lib/controller')
const showroomFacade = require('./facade')

class ShowroomController extends Controller {}

module.exports = new ShowroomController(showroomFacade)
