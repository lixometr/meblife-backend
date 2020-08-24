const controller = require('./controller')
const {Router} = require('express')
const router = Router()

router
  .get((...args) => controller.find(...args))
  router
  .post((...args) => controller.create(...args))

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args))

module.exports = router
