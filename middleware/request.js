const languageFacade = require('../model/language/facade')
const currencyFacade = require('../model/currency/facade')

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
            const currenctBySlug = await currencyFacade.findBySlug(queryCurrency)
            if (currenctBySlug) {
                currency = currenctBySlug
            }
        }
        req.request.language = lang
        req.request.currency = currency
        next()
    } catch (err) {
        next(err)
    }
}