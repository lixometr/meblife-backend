const Facade = require('../../lib/facade')
const looksSchema = require('./schema')

class LooksFacade extends Facade {}

module.exports = new LooksFacade('Looks', looksSchema)
