const _ = require('lodash')
const getLangText = (langId, defaultLangId) => arr => {
    let item = getLangItem(langId, defaultLangId)(arr)
    if(!item || !item.value) item = {value: ''}
    return item.value
}

const getLangItem = (langId, defaultLangId) => arr => {
    let el
    if (langId) {
        el = arr.find(item => item.langId.toString() === langId.toString())
    }
    if (!el && defaultLangId) {
        el = arr.find(item => item.langId.toString() === defaultLangId.toString())
    }
    return el
}

function translateFields(obj, fieldsToTranslate, langId, defaultLangId ) {
    let newObj = _.cloneDeep(obj)
    const translate = getLangText(langId, defaultLangId)
    fieldsToTranslate.forEach(field => {
        if (field.indexOf('.') >= 0) {
            newObj = _.set(newObj, field, translate(_.get(newObj, field)))
        } else {
            newObj[field] = translate(obj[field])
        }
    })
    return newObj
}

module.exports = {
    getLangText,
    getLangItem,
    translateFields
}