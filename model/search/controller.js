const Controller = require('../../lib/controller')
const searchFacade = require('./facade')
const productsController = require('../product/controller')
const manufacturersController = require('../manufacturer/controller')
const categoriesController = require('../category/controller')
const inspirationsController = require('../inspiration/controller')
const AppError = require('../../helpers/error')
const Modification = require('./modification')

class SearchController extends Controller {
    async search(req, res, next) {
        // search categories
        let categories = []
        await categoriesController.search(req, { json(body) { categories = body } }, next)

        // search manufacturers
        let manufacturers = []
        await manufacturersController.search(req, { json(body) { manufacturers = body } }, next)

        // search products (paginate)
        let products = {}
        await productsController.search(req, { json(body) { products = body } }, next)
        // search inspirations
        let inspirations = []

        await inspirationsController.search(req, { json(body) { inspirations = body } }, next)

        res.json({
            categories,
            manufacturers,
            products,
            inspirations,
        })
    }

}

module.exports = new SearchController(searchFacade, Modification)
