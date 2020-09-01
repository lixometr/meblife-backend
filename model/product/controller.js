const Controller = require('../../lib/controller')
const productFacade = require('./facade')
const categoryFacade = require('../category/facade')
const { getLangText } = require('../../helpers/functions');
const AppError = require('../../helpers/error');
const Modification = require('./modification');

class ProductController extends Controller {
    constructor(...args) {
        super(...args)

    }
    async create(req, res, next) {
        try {
            const doc = await this.facade.create(req.body)
            res.status(201).json(doc)
        } catch (err) {
            next(err)
        }
    }
    async getById(req, res, next) {
        try {
            const product = await this.facade.findById(req.params.id);
            if (!product) throw new AppError(404)
            const productToSend = this.facade.translate(product._doc, req.request.language.id, req.settings.language.id)

            res.json(productToSend);
        } catch (err) {
            next(err);
        }
    }
    async getBySlug(req, res, next) {
        try {
            const product = await this.facade.findBySlug(req.params.slug, req.request.language.id)

            if (!product) throw new AppError(404)
            const instance = new Modification(product, { langId: req.request.language.id, defaultLangId: req.settings.language.id })
            await instance.init()
            await instance.groupAttrs()
            res.json(instance.toJSON())
        } catch (err) {
            next(err)
        }
    }
    async update(req, res, next) {
        try {
            const result = await this.facade.update({ _id: req.params.id }, { $set: req.body })
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
    async getProductsByCategorySlug(req, res, next) {
        try {
            // Страницы
            const page = req.query.page;
            const perProductPage = 30;
            const category = await categoryFacade.findBySlug(req.params.slug, req.request.language.id)
            if (!category) throw new AppError(400)
            const products = await this.facade.findByCategoryId(category._id)
            if (!products) throw new AppError(404)
            let instanceProducts = products.map(async product => {
                const instance = new Modification(product, { langId: req.request.language.id, defaultLangId: req.settings.language.id })
                await instance.init()
                return instance.toJSON()
            })
            instanceProducts = await Promise.all(instanceProducts)
            let totalPages = instanceProducts.length / perProductPage
            if (totalPages < 1) totalPages = 1
            totalPages = Math.floor(totalPages)
            res.json({
                info: {
                    totalProducts: instanceProducts.length,
                    totalPages,
                },
                products: instanceProducts
            })
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = new ProductController(productFacade)
