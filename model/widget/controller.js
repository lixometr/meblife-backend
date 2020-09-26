const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const widgetFacade = require('./facade')
const TopBar = require('./items/TopBar')
const MainPage = require('./items/MainPage')
const Footer = require('./items/Footer')
const Modification = require('./modification')
class WidgetController extends Controller {
    async findByName(req, res, next) {
        try {
            const item = await this.facade.findByName(req.params.name)
            if (!item) throw new AppError(404)
            let instance = item
            const name = req.params.name
            if (req.params.name === 'top_bar') {
                instance = new TopBar(item, { langId: req.request.language._id, defaultLangId: req.settings.language._id })
            } else if (name === 'footer') {
                instance = new Footer(item, { langId: req.request.language._id, defaultLangId: req.settings.language._id })

            } else if (name === 'main_page') {
                instance = new MainPage(item, { langId: req.request.language._id, defaultLangId: req.settings.language._id })
            }
            else {
                instance = new Modification(item, { langId: req.request.language._id, defaultLangId: req.settings.language._id })
            }
            if(req.adminUser) {
                res.json(instance.toJSON())
                return
            }
            await instance.init()

            res.json(instance.toINFO())
        } catch (err) {
            next(err)
        }
    }
    async updateByName(req, res, next) {
        try {
            const item = await this.facade.findByName(req.params.name)
            if (!item) {
                await this.facade.create({
                    name: req.params.name,
                    ...req.body
                })
                res.json({ ok: true })
                return
            }
            const result = await this.facade.updateByName(req.params.name, {
                name: req.params.name,
                ...req.body
            })
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new WidgetController(widgetFacade, Modification)
