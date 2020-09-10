const Facade = require('../../lib/facade')
const authSchema = require('./schema')

class AuthFacade extends Facade {}

module.exports = new AuthFacade('Auth', authSchema)
