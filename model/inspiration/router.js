const controller = require('./controller')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const Router = require('express').Router
const router = new Router()

router.route('/')
  .get((...args) => controller.find(...args))
  .post(isAuthAdmin, (...args) => controller.create(...args))

router.route('/:id')
  .get((...args) => controller.findById(...args))
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))

module.exports = router
