const controller = require('./controller')
const productController = require('../product/controller')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const Router = require('express').Router
const router = new Router()

router.route('/')
  .get(isAuthAdmin, (...args) => controller.findAll(...args))
  .post(isAuthAdmin, (...args) => controller.create(...args))

router.get('/primary', (...args) => controller.getPrimaryCategories(...args))

router.route('/id/:id')
  .get((...args) => controller.findById(...args))
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))

router.get('/admin/id/:id', isAuthAdmin, (...args) => controller.findById(...args))
router.get('/admin/:slug', isAuthAdmin, (...args) => controller.findBySlug(...args))

router.get('/:slug', (...args) => controller.findBySlug(...args))



router.get('/:slug/parents', (...args) => controller.getParentList(...args))
router.get('/:slug/children', (...args) => controller.getChildren(...args))
router.get('/:slug/children-all', (...args) => controller.getChildrenAll(...args))
router.get('/:slug/products', (...args) => productController.getProductsByCategorySlug(...args))
router.get('/:slug/filters', (...args) => productController.getProductFiltersByCategorySlug(...args))

module.exports = router
