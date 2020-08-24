const Facade = require('../../lib/facade')
const languageSchema = require('./schema')

class LanguageFacade extends Facade {
    async findBySlug(slug) {
        return this.Model.findOne({slug});
    }
}

module.exports = new LanguageFacade('Language', languageSchema)
