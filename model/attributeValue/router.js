const controller = require('./controller')
const Router = require('express').Router
const router = new Router()
const isAuthAdmin = require('../../middleware/isAuthAdmin')

router.route('/')
  .get((...args) => controller.findAll(...args))
  .post((...args) => controller.create(...args))

router.route('/id/:id')
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
  .get((...args) => controller.findById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))

router.get('/admin/id/:id', isAuthAdmin, (...args) => controller.findById(...args))
router.get('/admin/:slug', isAuthAdmin, (...args) => controller.findBySlug(...args))

router.get('/search/:text', isAuthAdmin, (...args) => controller.search(...args))
router.get('/search/', isAuthAdmin, (...args) => controller.search(...args))


router.route('/:slug')
  .get((...args) => controller.findBySlug(...args))

module.exports = router
