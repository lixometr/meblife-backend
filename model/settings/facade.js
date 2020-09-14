const Facade = require('../../lib/facade')
const settingsSchema = require('./schema')

class SettingsFacade extends Facade {
    async findByName(name) {
        return this.Model.findOne({ name })
    }
    updateByName(name, data) {
        return this.Model.findOneAndUpdate({ name }, data)
    }
    async language() {
        return this.findByName('language')
    }
    currency() {
        return this.findByName('currency')
    }
}

module.exports = new SettingsFacade('Settings', settingsSchema)
