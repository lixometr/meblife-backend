const controller = require('./controller')
const Router = require('express').Router
const router = new Router()
const { body } = require('express-validator')
const isAuthAdmin = require('../../middleware/isAuthAdmin')

router.post('/login', [body('login').isString(), body('password').isLength({ min: 3 })], (...args) => controller.login(...args))
router.post('/signup', [body('login').isString(), body('password').isLength({ min: 3 })], (...args) => controller.signup(...args))
router.get('/check', isAuthAdmin, (...args) => controller.check(...args))



module.exports = router
