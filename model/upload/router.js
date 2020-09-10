const controller = require('./controller')
const Router = require('express').Router
const router = new Router()


router.post('/image', (...args) => controller.image(...args))
router.post('/file', (...args) => controller.file(...args))

module.exports = router
