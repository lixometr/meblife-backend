const controller = require('./controller')
const { Router } = require('express')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const router = Router()

router
  .get('/', isAuthAdmin, (...args) => controller.findAll(...args))
router
  .post('/', isAuthAdmin, (...args) => controller.create(...args))

router.route('/id/:id')
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
  .get((...args) => controller.findById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))

router.route('/:slug')
  .get((...args) => controller.findBySlug(...args))
  
module.exports = router
