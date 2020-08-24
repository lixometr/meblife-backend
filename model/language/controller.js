const Controller = require('../../lib/controller')
const languageFacade = require('./facade')

class LanguageController extends Controller {}

module.exports = new LanguageController(languageFacade)
