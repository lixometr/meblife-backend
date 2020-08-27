const languageFacade = require('../model/language/facade')
const currencyFacade = require('../model/currency/facade')
module.exports = () => async (req, res, next) => {
  req.settings = {};
  // заменить на админку
  const DEFAULT_LANGUAGE_ID = '5f4504ca6b10f5287451203c'
  const DEFAULT_CURRENCY_ID = 'test';
  try {
    req.settings.language = await languageFacade.findById(DEFAULT_LANGUAGE_ID)
    // req.settings.currency = await currencyFacade.findById(DEFAULT_CURRENCY_ID)
    req.settings.currency = {}
    next()
  } catch (err) {
    next(err)
  }

}