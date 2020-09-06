const languageFacade = require('../model/language/facade')
const currencyFacade = require('../model/currency/facade')
const AppError = require('../helpers/error')
module.exports = () => async (req, res, next) => {
    req.request = {};

    try {
        const queryLang = req.query.lang
        let lang = req.settings.language
        if (queryLang) {
            const langBySlug = await languageFacade.findBySlug(queryLang)
            if (langBySlug) {
                lang = langBySlug
            }
        }
        const queryCurrency = req.query.currency
        let currency = req.settings.currency
        if (queryCurrency) {
            const currencyBySlug = await currencyFacade.findBySlug(queryCurrency)
            if (currencyBySlug) {
                currency = currencyBySlug
            }
        }
        req.request.language = lang
        req.request.currency = currency
        next()
    } catch (err) {
        next(err)
    }
}