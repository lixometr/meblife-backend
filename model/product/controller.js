const Controller = require('../../lib/controller')
const productFacade = require('./facade')
const categoryFacade = require('../category/facade')
const { getLangText } = require('../../helpers/functions');
const AppError = require('../../helpers/error');

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
    async findById(req, res, next) {
        try {
            const product = await this.facade.findById(req.params.id);
            if(!product) throw new AppError(404)
            const productToSend = this.facade.translate(product._doc, req.request.language.id, req.settings.language.id)

            res.json(productToSend);
        } catch (err) {
            next(err);
        }
    }
    async getBySlug(req, res, next) {
        try {
            const product = await this.facade.findBySlug(req.params.slug)
            if (!product) throw new AppError(404)
            res.json(product)
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
            const category = await categoryFacade.findBySlug(req.params.slug)
            if (!category) throw new AppError(400)
            const products = await this.facade.findByCategoryId(category._id)
            const translatedProducts = products.map(product => {
                // await this.facade.populateFields(product)
                return this.facade.translate(product._doc, req.request.language.id, req.settings.language.id)
            })
            let totalPages = translatedProducts.length / perProductPage
            if(totalPages < 1) totalPages = 1
            totalPages = Math.floor(totalPages)
            res.json({
                totalProducts: translatedProducts.length,
                totalPages,
                products: translatedProducts
            })
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = new ProductController(productFacade)
