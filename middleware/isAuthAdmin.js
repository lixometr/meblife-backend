const jwt = require('jsonwebtoken')
const config = require('../config')
const adminUserFacade = require('../model/adminUser/facade')
const AppError = require('../helpers/error')
module.exports = async function (req, res, next) {
    try {
        let token = req.headers['authorization'] || ''
        token = token.split(' ')[1]
        if(!token) {
            throw new AppError(401, 'Invalid Token')
        }
        const userData = jwt.verify(token, config.JWT_SECRET)
        const user = await adminUserFacade.findById(userData.id)
        if(!user) {
            throw new AppError(401, null, 'userNotFound')
        }
        req.adminUser = user
        next()
    } catch (err) {
       
        next(err)
    }
}