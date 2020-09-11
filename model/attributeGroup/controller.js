const Controller = require('../../lib/controller')
const AttributeGroupFacade = require('./facade')
const Modification = require('./modification')
class AttributeGroupController extends Controller {


}


module.exports = new AttributeGroupController(AttributeGroupFacade, Modification)
