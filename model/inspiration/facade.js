const Facade = require('../../lib/facade')
const inspirationSchema = require('./schema')

class InspirationFacade extends Facade {}

module.exports = new InspirationFacade('Inspiration', inspirationSchema)
