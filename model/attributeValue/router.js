const controller = require('./controller')
const Router = require('express').Router
const router = new Router()

router.route('/')
  .get((...args) => controller.findAll(...args))
  .post((...args) => controller.create(...args))

router.route('/id/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args))

router.route('/:slug')
  .get((...args) => controller.findBySlug(...args))

module.exports = router
