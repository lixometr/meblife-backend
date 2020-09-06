const languageFacade = require('../model/language/facade')
const currencyFacade = require('../model/currency/facade')
module.exports = () => async (req, res, next) => {
  req.settings = {};
  // заменить на админку
  const DEFAULT_LANGUAGE_ID = '5f3cf76fa1e14a3b8c2caca5'
  const DEFAULT_CURRENCY_ID = '5f525bfc4dd9022ed8bbfd0b';
  try {
    req.settings.language = await languageFacade.findById(DEFAULT_LANGUAGE_ID)
    req.settings.currency = await currencyFacade.findById(DEFAULT_CURRENCY_ID)
    next()
  } catch (err) {
    next(err)
  }

}