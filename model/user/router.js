const controller = require('./controller')
const { Router } = require('express')
const router = Router()
const {body} = require('express-validator')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const isAuth = require('../../middleware/isAuth')

router
  .get('/', isAuthAdmin, (...args) => controller.findAll(...args))
router
  .post('/', isAuthAdmin, (...args) => controller.create(...args))


router.put('/change-password', isAuth, (...args) => controller.changePassword(...args))
router.put('/change-email', isAuth, (...args) => controller.changeEmail(...args))

router.get('/info', isAuth, (...args) => controller.getInfo(...args))
router.put('/info', isAuth, (...args) => controller.updateInfo(...args))

router.get('/favourite', isAuth, (...args) => controller.getFavourite(...args))
router.put('/favourite', isAuth, body('').isArray(), (...args) => controller.updateFavourite(...args))

router.route('/:id')
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
  .get(isAuthAdmin, (...args) => controller.findById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))


module.exports = router
