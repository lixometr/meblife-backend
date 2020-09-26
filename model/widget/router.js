const controller = require('./controller')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const Router = require('express').Router
const router = new Router()

router.route('/')
  .get((...args) => controller.findAll(...args))
  .post(isAuthAdmin, (...args) => controller.create(...args))
router.route('/id/:id')
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
  .get((...args) => controller.findById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))
router.get('/admin/:name', isAuthAdmin, (...args) => controller.findByName(...args))


router.put('/:name', isAuthAdmin, (...args) => controller.updateByName(...args))
router.get('/:name', (...args) => controller.findByName(...args))

module.exports = router
