const languageFacade = require('../model/language/facade')
const currencyFacade = require('../model/currency/facade')
const settingsFacade = require('../model/settings/facade')
module.exports = () => async (req, res, next) => {
  req.settings = {};
  
  
  // const DEFAULT_LANGUAGE_ID = '5f3cf76fa1e14a3b8c2caca5'
  // const DEFAULT_CURRENCY_ID = '5f525bfc4dd9022ed8bbfd0b'
  const {value: DEFAULT_LANGUAGE_ID} = await settingsFacade.findByName('language')
  const {value: DEFAULT_CURRENCY_ID} = await settingsFacade.findByName('currency')
  try {
    
    req.settings.language = await languageFacade.findById(DEFAULT_LANGUAGE_ID)
    req.settings.currency = await currencyFacade.findById(DEFAULT_CURRENCY_ID)
    next()
  } catch (err) {
    next(err)
  }

}