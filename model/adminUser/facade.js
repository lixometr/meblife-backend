const Facade = require('../../lib/facade')
const adminuserSchema = require('./schema')
const bcrypt = require('bcrypt')
const config = require('../../config')

class AdminuserFacade extends Facade {
    /**
     * 
     * @param {String} login 
     * @param {String} password 
     * @returns Boolean
     */
    async check(login, password) {
        const user = await this.Model.findOne({ login })
        if (!user) return false
        const result = await bcrypt.compare(password, user.password)
        return result
    }
    async findByLogin(login) {
        const result = await this.Model.findOne({ login })
        return result
    }
    async create(data) {
        let password = data.password
        const salt = await bcrypt.genSalt(8);
        password = await bcrypt.hash(password, salt);
        data = { ...data, password }
        const result = await this.Model.create(data)

        return result
    }
}

module.exports = new AdminuserFacade('Adminuser', adminuserSchema)
