const Controller = require('../../lib/controller')
const _ = require('lodash')
const AppError = require('../../helpers/error')
const Modification = require('./modification')
const categoryFacade = require('./facade')
const manufacturerFacade = require('../manufacturer/facade')

class CategoryController extends Controller {

    async getParentList(req, res, next) {
        try {
            const category = await this.facade.findBySlug(req.params.slug, req.request.language.id)
            if (!category) throw new AppError(404)
            const result = await this.facade.findParentsById(category._id)
            const translatedResult = result.map(item => {
                const instance = new Modification(item, { langId: req.request.language.id, defaultLangId: req.settings.language.id })
                instance.translate()
                return instance.toJSON()
            })
            res.json(translatedResult)
        } catch (err) {
            next(err)
        }
    }
    async getChildren(req, res, next) {
        try {
            const category = await this.facade.findBySlug(req.params.slug, req.request.language.id)
            if (!category) throw new AppError(404)
            const result = await this.facade.findChildrenById(category._id)
            // const translatedResult = result.map(item => this.facade.translate(item._doc, req.request.language.id, req.settings.language.id))
            const translatedResult = result.map(item => new Modification(item, { langId: req.request.language.id, defaultLangId: req.settings.language.id }).translate())

            res.json(translatedResult)
        } catch (err) {
            next(err)
        }
    }
    /**
     * @interface CategoryListItem {
     *  category: Category,
     *  children: [CategoryListItem]
     * }
     * @returns {
     *  CategoryListItem
     * }
     */
    async getChildrenAll(req, res, next) {
        try {
            const category = await this.facade.findBySlug(req.params.slug, req.request.language.id)
            if (!category) throw new AppError(404)
            const result = await this.facade.findAllChildrenById(category._id)
            const translateRecursive = (obj) => {
                const instanse = new Modification(obj.category, { langId: req.request.language.id, defaultLangId: req.settings.language.id })
                instanse.translate()
                obj.category = instanse.toJSON()
                obj.children = obj.children.map(child => {
                    return translateRecursive(child)
                })
                return {
                    category: obj.category,
                    children: obj.children
                }
            }
            const cloned = _.cloneDeep(result)

            const translatedCategories = translateRecursive(cloned)
            res.json(translatedCategories)
        } catch (err) {
            next(err)
        }
    }

    async getPrimaryCategories(req, res, next) {
        try {
            const result = await this.facade.findWithoutParent()
            const translatedResult = result.map(item => {
                const instance = new Modification(item, { langId: req.request.language.id, defaultLangId: req.settings.language.id })
                instance.translate()
                return instance.toJSON()
            })

            res.json(translatedResult)
        } catch (err) {
            next(err)
        }
    }

    async findByManufacturerSlug(req, res, next) {
        try {
            const manufacturer = await manufacturerFacade.findBySlug(req.params.slug, req.request.language.id)
            if (!manufacturer) throw new AppError(400)
            const categories = await this.facade.findByManufacturerId(manufacturer._id)
            const resolvers = categories.map(async category => {
                const instance = new Modification(category, {
                    langId: req.request.language._id,
                    defaultLangId: req.settings.language._id,
                    currency: req.request.currency,
                    defaultCurrency: req.settings.currency
                })
                await instance.init()
                return instance.toINFO()
            })
            const items = await Promise.all(resolvers)
            res.json(items)
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = new CategoryController(categoryFacade, Modification)