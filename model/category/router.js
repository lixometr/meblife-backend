const controller = require('./controller')
const productController = require('../product/controller')
const Router = require('express').Router
const router = new Router()

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args))

router.get('/primary', (...args) => controller.getPrimaryCategories(...args))

router.route('/id/:id')
  .get((...args) => controller.findById(...args))
  .put((...args) => controller.update(...args))
  
router.route('/:slug')
  // .put()
  .get((...args) => controller.findBySlug(...args))
  .delete((...args) => controller.remove(...args))



router.get('/:slug/parents', (...args) => controller.getParentList(...args))
router.get('/:slug/children', (...args) => controller.getChildren(...args))
router.get('/:slug/children-all', (...args) => controller.getChildrenAll(...args))
router.get('/:slug/products', (...args) => productController.getProductsByCategorySlug(...args))
router.get('/:slug/filters', (...args) => productController.getProductFiltersByCategorySlug(...args))

module.exports = router
