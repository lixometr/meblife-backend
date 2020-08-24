const Facade = require('../../lib/facade')
const manufacturerSchema = require('./schema')

class ManufacturerFacade extends Facade {}

module.exports = new ManufacturerFacade('Manufacturer', manufacturerSchema)
