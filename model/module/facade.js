const Facade = require('../../lib/facade')
const moduleSchema = require('./schema')
const _ = require('lodash')
const {getLangText} = require('../../helpers/functions')

class ModuleFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = [
            'title',
            'sub_title',
            'description',
            'more_btn',
            'more_btn_url',
            'module_images'
        ]
        this.relations = [
            {
                model: "ModuleGroup",
                field: 'modules'
            }
        ]
    }
    async findByIdUsingModel(id, model) {
        return this.Model.model(model).findById(id)
    }
    translate(obj, languageId, defaultLanguageId) {
        let newObj = _.cloneDeep(obj)
        const translate = getLangText(languageId, defaultLanguageId)
        this.fieldsToTranslate.forEach(field => {
            if(field === 'module_images') {
                newObj[field] = newObj[field].map(modImage => ({
                    _id: modImage._id,
                    image: modImage.image,
                    title: translate(modImage.title),
                    sub_title: translate(modImage.sub_title),
                    description: translate(modImage.description),
                    more_btn: translate(modImage.more_btn),
                    more_btn_url: translate(modImage.more_btn_url),
                }))
                return
            }
            if (field.indexOf('.') >= 0) {
                newObj = _.set(newObj, field, translate(_.get(newObj, field)))
            } else {
                newObj[field] = translate(obj[field])
            }
        })
        return newObj
    }
}

module.exports = new ModuleFacade('Module', moduleSchema)
