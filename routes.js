const Router = require('express').Router
const router = new Router()

const attributeValue = require('./model/attributeValue/router')
const appModule = require('./model/module/router')
const moduleGroup = require('./model/moduleGroup/router')
const language = require('./model/language/router')
// const productCurrency = require('./model/productCurrency/router')
// const productLabel = require('./model/productLabel/router')
const looks = require('./model/looks/router')
const showroom = require('./model/showroom/router')
const inspiration = require('./model/inspiration/router')
const manufacturer = require('./model/manufacturer/router')
const category = require('./model/category/router')
const user = require('./model/user/router')
const product = require('./model/product/router')

router.route('/').get((req, res) => {
  res.json({ message: 'Example API!' })
})
router.use('/attribute-value', attributeValue)

router.use('/module', appModule)

router.use('/module-group', moduleGroup)

router.use('/language', language)

// router.use('/product-currency', product-currency)

// router.use('/product-label', productLabel)

router.use('/looks', looks)
router.use('/showroom', showroom)
router.use('/manufacturer', manufacturer)
router.use('/inspiration', inspiration)


router.use('/category', category)

router.use('/user', user)
router.use('/product', product)

module.exports = router
