const controller = require('./controller')
const { Router } = require('express')
const router = Router()
router
  .get('/', (...args) => controller.find(...args))
router
  .post('/', (...args) => controller.create(...args))

router.route('/id/:id')
  .get((...args) => controller.getById(...args))
  .put((...args) => controller.update(...args))
  

router.route('/:slug')
  .put((...args) => controller.update(...args))
  .get( (...args) => controller.getBySlug(...args))
  .delete((...args) => controller.remove(...args))

router.get('/:id/categories', (...args) => controller.getCategories(...args))

module.exports = router
