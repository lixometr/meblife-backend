const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const settingsFacade = require('./facade')

class SettingsController extends Controller {
    async findByName(req, res, next) {
        try {
            const item = await this.facade.findByName(req.params.name)
            if(!item) throw new AppError(404)
            res.json(item.value)
        } catch (err) {
            next(err)
        }
    }
    async updateByName(req, res, next) {
        try {
            const item = await this.facade.findByName(req.params.name)
            if(!item) {
                await this.facade.create({
                    name: req.params.name,
                    value: req.body.value
                })
                res.json({ok: true})
                return
            }
            const result = await this.facade.updateByName(req.params.name, {
                name: req.params.name,
                value: req.body.value
            })
            res.json({ok: true})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new SettingsController(settingsFacade)
