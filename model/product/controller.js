const Controller = require('../../lib/controller')
const productFacade = require('./facade')
const categoryFacade = require('../category/facade')
const inspirationFacade = require('../inspiration/facade')
const AppError = require('../../helpers/error');
const Modification = require('./modification');
const config = require('../../config');
const CategoryModification = require('../category/modification');
const _ = require('lodash');
const manufacturerFacade = require('../manufacturer/facade');
class ProductController extends Controller {
    constructor(...args) {
        super(...args)

    }
    async findAll(req, res, next) {
        try {
            const page = req.query.page
            const products = await this.facade.findAll()
            this.modifyProducts(req, res, next, products)
        } catch (err) {
            next(err)
        }
    }
    async search(req, res, next) {
        try {
            const searchPhrase = req.params.text
            let items = []
            if (!searchPhrase) {
                items = await this.facade.findAll({ limit: 10 })
            } else {
                items = await this.facade.findAll()
            }
            const resolvers = items.map(async item => {
                const instance = new this.Modification(item, {
                    langId: req.request.language._id,
                    defaultLangId: req.settings.language._id,
                    currency: req.request.currency,
                    defaultCurrency: req.settings.currency
                })
                await instance.init()
                if (req.adminUser) {
                    return instance.toADMIN()
                } else {
                    return instance.toINFO()
                }
            })
            const modProducts = await Promise.all(resolvers)
            if (!searchPhrase) {
                res.json(modProducts)
                return
            }
            const filteredProds = modProducts.filter(product => {
                return product.full_name.indexOf(searchPhrase) > -1
            })
            res.json(filteredProds)
        } catch (err) {
            next(err)
        }
    }
    async findById(req, res, next) {

        try {
            const product = await this.facade.findById(req.params.id, req.request.language.id)
            if (!product) throw new AppError(404)
            if (req.adminUser) {
                res.json(product)
                return
            }
            const instance = new Modification(product, {
                langId: req.request.language.id,
                defaultLangId: req.settings.language.id,
                currency: req.request.currency,
                defaultCurrency: req.settings.currency
            })
            await instance.init()
            await instance.groupAttrs()
            res.json(instance.toJSON())
        } catch (err) {
            next(err)
        }
    }
    async findBySlug(req, res, next) {
        try {
            const product = await this.facade.findBySlug(req.params.slug, req.request.language.id)
            if (!product) throw new AppError(404)
            req.params.id = product._id.toString()
            await this.findById(req, res, next)
        } catch (err) {
            next(err)
        }


    }
    async modifyProducts(req, res, next, products) {
        try {
            // Страницы
            let page = parseInt(req.query.page)
            if (isNaN(page)) {
                page = 0
            } else {
                page -= 1
            }
            const perProductPage = config.productsPerPage;

            let filters = req.query.filters
            // 'cheap' | 'expansive' | 'popular' | 'sale' | 'new'
            const sortCheck = ['cheap', 'expansive', 'popular', 'sale', 'new']
            let sortBy = req.query.sort_by
            if (!sortCheck.includes(sortBy)) sortBy = 'popular'
            let sendFilters = req.query.need_filters || false
            if (filters) {
                try {
                    filters = JSON.parse(filters)
                } catch (err) {
                    console.log(err)
                    throw new AppError(400)
                }
            } else {
                filters = {}
            }

            let modProducts = products.map(async product => {
                const instance = new Modification(product, {
                    langId: req.request.language.id,
                    defaultLangId: req.settings.language.id,
                    currency: req.request.currency,
                    defaultCurrency: req.settings.currency
                })
                await instance.init()
                return instance.toINFO()
            })

            modProducts = await Promise.all(modProducts)
            let cutProducts = [...modProducts]
            if (!_.isEmpty(filters)) {
                cutProducts = this.facade.filterProducts(cutProducts, filters)
            }
            cutProducts = this.facade.sortProducts(cutProducts, sortBy)


            let totalPages = cutProducts.length / perProductPage
            if (totalPages < 1) totalPages = 1
            totalPages = Math.floor(totalPages)

            const toSend = {
                info: {
                    totalProducts: cutProducts.length,
                    totalPages,
                },
                products: cutProducts.slice(page, perProductPage)
            }
            if (sendFilters) {
                toSend.filters = this.facade.getFilters(modProducts)
            }
            res.json(toSend)
        } catch (err) {
            next(err)
        }
    }
    /**
     * 
     * @param ?filters=JSON ?sort_by
     */
    async getProductsByCategorySlug(req, res, next) {
        try {
            const category = await categoryFacade.findBySlug(req.params.slug, req.request.language.id)
            if (!category) throw new AppError(400)
            const products = await this.facade.findByCategoryId(category._id)
            this.modifyProducts(req, res, next, products)
        }
        catch (err) {
            next(err)
        }
    }
    async findByManufacturerSlug(req, res, next) {
        try {
            const manufacturer = await manufacturerFacade.findBySlug(req.params.slug, req.request.language.id)
            if (!manufacturer) throw new AppError(400)
            const products = await this.facade.findByManufacturerId(manufacturer._id)
            this.modifyProducts(req, res, next, products)
        }
        catch (err) {
            next(err)
        }
    }
    async getSimilarProductsBySlug(req, res, next) {
        try {
            const products = await this.facade.findSimilarProductsBySlug(req.params.slug, req.request.language.id)
            let instanceProducts = products.map(async product => {
                const instance = new Modification(product, {
                    langId: req.request.language.id,
                    defaultLangId: req.settings.language.id,
                    currency: req.request.currency,
                    defaultCurrency: req.settings.currency
                })
                await instance.init()
                return instance.toINFO()
            })
            instanceProducts = await Promise.all(instanceProducts)
            res.json(instanceProducts)
        } catch (err) {
            next(err)
        }
    }

    async getSimilarCategoriesBySlug(req, res, next) {
        try {
            const product = await this.facade.findBySlug(req.params.slug, req.request.language.id)
            if (!product) throw new AppError(404)
            let categories = []
            categories.push(product.primary_category)
            categories = categories.concat(product.category)
            categories = categories.map(async categoryId => categoryFacade.findById(categoryId))
            categories = await Promise.all(categories)
            categories = categories.map(category => new CategoryModification(category, { langId: req.request.language.id, defaultLangId: req.settings.language.id }).translate().toINFO())
            res.json(categories)
        } catch (err) {
            next(err)
        }
    }
    async getProductFiltersByCategorySlug(req, res, next) {
        // this.findByCategoryId(req.params)
        try {
            const category = await categoryFacade.findBySlug(req.params.slug, req.request.language.id)
            if (!category) throw new AppError(404)
            let products = await this.facade.findByCategoryId(category._id)
            products = products.map(async product => {
                const instance = new Modification(product, {
                    langId: req.request.language.id,
                    defaultLangId: req.settings.language.id,
                    currency: req.request.currency,
                    defaultCurrency: req.settings.currency
                })
                await instance.init()
                return instance.toJSON()
            })
            products = await Promise.all(products)
            const filters = this.facade.getFilters(products)
            res.json(filters)
        } catch (err) {
            next(err)
        }
    }
    async getProductFiltersByInspirationSlug(req, res, next) {
        // this.findByCategoryId(req.params)
        try {
            const inspiration = await inspirationFacade.findBySlug(req.params.slug, req.request.language.id)
            if (!inspiration) throw new AppError(400)
            let { products1: products } = await inspiration.populate('products1').execPopulate()
            products = products.map(async product => {
                const instance = new Modification(product, {
                    langId: req.request.language.id,
                    defaultLangId: req.settings.language.id,
                    currency: req.request.currency,
                    defaultCurrency: req.settings.currency
                })
                await instance.init()
                return instance.toJSON()
            })
            products = await Promise.all(products)
            const filters = this.facade.getFilters(products)
            res.json(filters)
        } catch (err) {
            next(err)
        }
    }


}

module.exports = new ProductController(productFacade, Modification)
