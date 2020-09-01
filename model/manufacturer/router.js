const controller = require('./controller')
const Router = require('express').Router
const router = new Router()

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args))
router.route('/id/:id')
  .get((...args) => controller.findById(...args))
  .post((...args) => controller.create(...args))

router.route('/:slug')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findBySlug(...args))
  .delete((...args) => controller.remove(...args))

module.exports = router
