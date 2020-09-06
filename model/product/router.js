const controller = require('./controller')
const { Router } = require('express')
const router = Router()
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const isAuth = require('../../middleware/isAuthAdmin')
router
  .get('/', (...args) => controller.find(...args))
router
  .post('/', (...args) => controller.create(...args))
router.get('/test/:slug', (...args) => controller.test(...args))

router.route('/id/:id')
  .get((...args) => controller.getById(...args))
  .put((...args) => controller.update(...args))


router.route('/:slug')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.getBySlug(...args))
  .delete((...args) => controller.remove(...args))

router.route('/admin/:slug')
  .put((...args) => controller.update(...args))
  .get(isAuthAdmin, (...args) => controller.getBySlug(...args))
  .delete((...args) => controller.remove(...args))

router.get('/:id/categories', (...args) => controller.getCategories(...args))

router.get('/:slug/similar-products', (...args) => controller.getSimilarProductsBySlug(...args))
router.get('/:slug/similar-categories', (...args) => controller.getSimilarCategoriesBySlug(...args))


module.exports = router
