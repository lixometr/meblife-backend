const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const languageFacade = require('./facade')
const Modification = require('./modification')

class LanguageController extends Controller {
    async findAll(req, res, next) {
        try {
            const items = await this.facade.find()
            if (!items) throw new AppError(404)
            res.json(items)
        } catch (err) {
            next(err)
        }
    }
    async findBySlug(req, res, next) {
        try {
            const slug = req.params.slug
            const isExist = await this.facade.existTranslation(slug)
            if (!isExist) throw new AppError(404)
            const translation = await this.facade.getTranslation(slug)
            if (!translation) throw new AppError(404)
            res.json(translation)
        } catch (err) {
            next(err)
        }
    }
    async updateBySlug(req, res, next) {
        try {
            const slug = req.params.slug
            const isExist = await this.facade.existTranslation(slug)
            if (!isExist) throw new AppError(404)
            await this.facade.updateTranslation(slug, req.body)
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new LanguageController(languageFacade, Modification)
