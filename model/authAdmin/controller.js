const Controller = require('../../lib/controller')
const authadminFacade = require('./facade')
const adminUserFacade = require('../adminUser/facade')
const { validationResult } = require('express-validator')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const AdminUserModification = require('../adminUser/modification')
const AppError = require('../../helpers/error')

class AuthadminController extends Controller {
    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new AppError(400, 'Некорректные данные')
            }
            const login = req.body.login
            const password = req.body.password
            const isValid = await adminUserFacade.check(login, password)
            if (!isValid) throw new AppError(null, 'Неверный логин или пароль')
            const user = await adminUserFacade.findByLogin(login)
            const token = jwt.sign({ id: user._id, exp: (Date.now() / 1000) + config.JWT_EXPIRES }, config.JWT_SECRET)
            const userToSend = new AdminUserModification(user).toINFO()
            res.json({
                token,
                user: userToSend
            })

        } catch (err) {
            next(err)
        }
    }
    async signup(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new AppError(400, 'Некорректные данные')
            }
            const isExist = await adminUserFacade.findByLogin(req.body.login)
            if(isExist) throw new AppError(409, 'Такой пользователь существует')
            const adminUser = await adminUserFacade.create(req.body)
            console.log(adminUser)
            if(!adminUser) throw new AppError(500)
            res.json(adminUser)
        } catch (err) {
            next(err)
        }
    }
    async check(req, res, next) {
        try {

            res.json({ok: true})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AuthadminController(authadminFacade)
