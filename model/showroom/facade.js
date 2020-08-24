const Facade = require('../../lib/facade')
const showroomSchema = require('./schema')

class ShowroomFacade extends Facade {}

module.exports = new ShowroomFacade('Showroom', showroomSchema)
