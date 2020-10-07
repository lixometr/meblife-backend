const Controller = require('../../lib/controller')
const attributeValueFacade = require('./facade')
const Modification = require('./modification')

class AttributeValueController extends Controller {
  

}

module.exports = new AttributeValueController(attributeValueFacade, Modification)
