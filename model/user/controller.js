
const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const userFacade = require('./facade')
const Modification = require('./modification')

class UserController extends Controller {
    async getInfo(req, res, next) {
        try {
            const user = new Modification(req.user)
            await user.init()
            res.json(user.toINFO())
        } catch (err) {
            next(err)
        }
    }
    async updateInfo(req, res, next) {
        try {
            const data = req.body
            let user = req.user
        } catch (err) {
            next(err)
        }
    }
    /*
        {
            newPassword: '',
            password: '',
            newPasswordRepeat: ''
        }
    */
    async changePassword(req, res, next) {
        try {

            const { newPassword, password, newPasswordRepeat } = req.body
            if (newPassword !== newPasswordRepeat) throw new AppError(200, '', 'passwordsNotEquals')
            if (newPassword === password) throw new AppError(200, '', 'passwordsAreSimilar')
            const check = await this.facade.check(req.user.email, password)
            if (!check) throw new AppError(200, '', 'passwordIncorrect')
            const result = await this.facade.changePassword(req.user._id, { newPassword })
            res.json({ ok: true, })
        } catch (err) {
            next(err)
        }
    }
    /*
       {
           email: '',
           password: '',
       }
   */
    async changeEmail(req, res, next) {
        try {
            const { email, password } = req.body
            // Совпадает ли пароль
            const check = await this.facade.check(req.user.email, password)
            if (!check) throw new AppError(200, '', 'passwordIncorrect')
            // Есть ли юзер с таким email
            const hasEmail = await this.facade.findByEmail(email)
            if (hasEmail) throw new AppError(200, '', 'userExist')
            const result = await this.facade.changeEmail(req.user._id, { email })
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }
    async updateFavourite(req, res, next) {
        try {
            const newFavourite = req.body
            const nowUser = await this.facade.updateFavourite(req.user._id, newFavourite)
            const instance = new Modification(nowUser, {
                langId: req.request.language._id,
                defaultLangId: req.settings.language._id,
                currency: req.request.currency,
                defaultCurrency: req.settings.currency
            })
            await instance.initFavourite()
            const favourite = instance.toJSON().favourite || []
            res.json({ ok: true, favourite })
        } catch (err) {
            next(err)
        }
    }
    async getFavourite(req, res, next) {
        try {
            const instance = new Modification(req.user, {
                langId: req.request.language._id,
                defaultLangId: req.settings.language._id,
                currency: req.request.currency,
                defaultCurrency: req.settings.currency
            })
            await instance.initFavourite()
            const favourite = instance.toJSON().favourite || []
            console.log(favourite)
            res.json(favourite)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController(userFacade, Modification)
