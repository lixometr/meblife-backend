
const _ = require('lodash')
/**
 * 
 * @param {Object} options 
 *  {
 *      // Id шаблона письма
 *      template: '',
 *      to: '',
 *      // Информация для шаблона
 *      data: {}
 *  }
 */
function sendMail(options) {
    const templateId = options.template
    const data = options.data || {}
    const template = getMail(templateId, data)
}

function defineMail(templateId) {
    if (templateId === 'signup') {
        return require('../mails/signup')
    }
    if (templateId === 'restore') {
        return require('../mails/restore')
    }
}

function getMail(templateId, data) {
    const mailTemplate = defineMail(templateId)
    const compile = _.template(mailTemplate)
    return compile(data)
}
module.exports = { sendMail }