const Facade = require('../../lib/facade')
const moduleSchema = require('./schema')

class ModuleFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.fieldsToTranslate = [
            'module_texts.title',
            'module_texts.sub_title',
            'module_texts.description',
            'module_texts.more_btn',
            'module_texts.more_btn_url',
            // Сделать translate для массива картинок с текстами
       ]
    }
}

module.exports = new ModuleFacade('Module', moduleSchema)
