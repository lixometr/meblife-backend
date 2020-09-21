const controller = require('./controller')
const Router = require('express').Router
const router = new Router()
const isAuthAdmin = require('../../middleware/isAuthAdmin')
router.route('/')
  .get((...args) => controller.findAll(...args))
  .post(isAuthAdmin, (...args) => controller.create(...args))

router.route('/id/:id')
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
  .get((...args) => controller.findById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))

router.get('/admin/id/:id', isAuthAdmin, (...args) => controller.findById(...args))

router.get('/product/:slug', (...args) => controller.findByProductSlug(...args))
router.get('/category/:slug', (...args) => controller.findByCategorySlug(...args))
router.get('/manufacturer/:slug', (...args) => controller.findByManufacturerSlug(...args))

module.exports = router
