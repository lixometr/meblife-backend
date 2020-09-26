const Facade = require('../../lib/facade')
const widgetSchema = require('./schema')
const _ = require('lodash')
const { getLangText } = require('../../helpers/functions')

class WidgetFacade extends Facade {
    async findByName(name) {
        return this.Model.findOne({ name })
    }
    updateByName(name, data) {
        return this.Model.findOneAndUpdate({ name }, data)
    }
    translate(obj, languageId, defaultLanguageId) {
        let item = _.cloneDeep(obj)
        const translate = getLangText(languageId, defaultLanguageId)
        if (_.isObject(item.texts)) {
            const texts = Object.keys(item.texts)
            texts.forEach(prop => {
                item.texts[prop] = translate(item.texts[prop])
            })
        }
        return item
    }

}

module.exports = new WidgetFacade('Widget', widgetSchema)
