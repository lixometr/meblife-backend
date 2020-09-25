const Facade = require('../../lib/facade')
const userSchema = require('./schema')
const bcrypt = require('bcrypt')
const config = require('../../config')
const { result } = require('lodash')

class UserFacade extends Facade {
    /**
    * 
    * @param {String} email 
    * @param {String} password 
    * @returns Boolean
    */
    async check(email, password) {
        const user = await this.Model.findOne({ email })
        if (!user) return false
        const result = await bcrypt.compare(password, user.password)
        return result
    }
    async findByEmail(email) {
        const result = await this.Model.findOne({ email })
        return result
    }
    async create(data) {
        let password = data.password
        const salt = await bcrypt.genSalt(8);
        password = await bcrypt.hash(password, salt);
        const confirm_key = await bcrypt.genSalt(10)
        data = { ...data, password, confirm_key }
        const result = await this.Model.create(data)

        return result
    }
    
    async updateFavourite(id, data) {
        const user = await this.findById(id)
        user.favourite = data
        const result = await user.save()
        return result
    }
    async changeEmail(id, {email}) {
        const user = await this.findById(id)
        user.email = email
        return await user.save()
    }
    async changePassword(id, {newPassword}) {
        const user = await this.findById(id)
        const salt = await bcrypt.genSalt(8);
        const password = await bcrypt.hash(newPassword, salt);
        user.password = password
        return await user.save()
    }
    async findByConfirmKey(key) {
        const user = await this.Model.findOne({confirm_key: key})
        return user
    }
    async confirm(id) {
        const user = await this.findById(id)
        user.is_confirmed = true
        user.confirm_key = null
        return await user.save()

    }
}

module.exports = new UserFacade('User', userSchema)
