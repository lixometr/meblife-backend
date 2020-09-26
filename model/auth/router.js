const controller = require('./controller')
const Router = require('express').Router
const router = new Router()
const { body } = require('express-validator')

router.post('/login', [body('email').isString().isEmail(), body('password').isString()], (...args) => controller.login(...args))
router.post('/signup', [body('email').isString().isEmail(), body('password').isLength({ min: 4 })], (...args) => controller.signup(...args))
router.post('/restore', [body('email').isString().isEmail(),], (...args) => controller.restore(...args))
router.get('/confirm/:key', (...args) => controller.confirm(...args))
// router.get('/check', (...args) => controller.check(...args))

module.exports = router
