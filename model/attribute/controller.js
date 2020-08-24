const Controller = require('../../lib/controller')
const userFacade = require('./facade')

class AttributeController extends Controller {
    findById(req, res, next) {
        const attribute = await this.facade.findById(req.params.id);
        let nameLeng = attribute.name.filter(text => text.lang === req.query.lang);
        if(!nameLeng) {
            nameLeng = attribute.name.find(text => text.leng === config.defaultLeng);
        }
        attribute.name = (nameLeng && nameLeng[0] && nameLeng[0].value) || '';

    }
}

module.exports = new AttributeController(userFacade)
