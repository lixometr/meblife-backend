const controller = require('./controller')
const { Router } = require('express')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const router = Router()

router
  .get('/', isAuthAdmin, (...args) => controller.findAll(...args))
router
  .post('/', isAuthAdmin, (...args) => controller.create(...args))

router.route('/id/:id')
  .get((...args) => controller.findById(...args))
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))

router.get('/admin/id/:id', isAuthAdmin, (...args) => controller.findById(...args))
router.get('/admin/:slug', isAuthAdmin, (...args) => controller.findBySlug(...args))

router.route('/:slug')
  .get((...args) => controller.findBySlug(...args))

router.get('/:slug/values', (...args) => controller.findValuesBySlug(...args))
router.get('/id/:id/values', (...args) => controller.findValuesById(...args))
module.exports = router
