const Controller = require('../../lib/controller')
const _ = require('lodash')
const AppError = require('../../helpers/error')
const Modification = require('./modification')
const categoryFacade = require('./facade')

class CategoryController extends Controller {
    async update(req, res, next) {
        try {
            const result = await this.facade.update({
                _id: req.params.id
            }, req.body)
            res.json(result);
        } catch (err) {
            next(err)
        }
    }
    async getParentList(req, res, next) {
        try {
            const category = await this.facade.findBySlug(req.params.slug, req.request.language.id)
            if (!category) throw new AppError(404)
            const result = await this.facade.findParentsById(category._id)
            const translatedResult = result.map(item => {
                const instance = new Modification(item, {langId: req.request.language.id, defaultLangId: req.settings.language.id})
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
                const instanse = new Modification(obj.category, {langId: req.request.language.id, defaultLangId: req.settings.language.id})
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
    async findBySlug(req, res, next) {
        try {
            const category = await this.facade.findBySlug(req.params.slug, req.request.language.id)
            if (!category) throw new AppError(404)
            console.log(this.facade)
            let instance = new Modification(category, {langId: req.request.language.id, defaultLangId: req.settings.language.id})
            instance.translate()
            res.json(instance.toJSON())
        } catch (err) {
            next(err)
        }
    }
    async getPrimaryCategories(req, res, next) {
        try {
            const result = await this.facade.findWithoutParent()
            const translatedResult = result.map(item => {
                const instance = new Modification(item._doc, {langId: req.request.language.id, defaultLangId: req.settings.language.id})
                instance.translate()
                return instance.toJSON()
            })

            res.json(translatedResult)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new CategoryController(categoryFacade)