const controller = require('./controller')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const Router = require('express').Router
const router = new Router()

router.get('/:text', (...args) => controller.search(...args))

module.exports = router
