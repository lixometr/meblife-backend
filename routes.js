const Router = require('express').Router
const router = new Router()

const adminUser = require('./model/adminUser/router')
const authAdmin = require('./model/authAdmin/router')
const auth = require('./model/auth/router')
const attributeValue = require('./model/attributeValue/router')
const attribute = require('./model/attribute/router')
const attributeGroup = require('./model/attributeGroup/router')
const appModule = require('./model/module/router')
const moduleGroup = require('./model/moduleGroup/router')
const language = require('./model/language/router')
const productCurrency = require('./model/currency/router')
const productLabel = require('./model/productLabel/router')
const looks = require('./model/looks/router')
const showroom = require('./model/showroom/router')
const inspiration = require('./model/inspiration/router')
const manufacturer = require('./model/manufacturer/router')
const category = require('./model/category/router')
const user = require('./model/user/router')
const product = require('./model/product/router')
const upload = require('./model/upload/router')
const settings = require('./model/settings/router')
const page = require('./model/page/router')
const widget = require('./model/widget/router')
const promocode = require('./model/promocode/router')
const search = require('./model/search/router')
const productModel = require('./model/productModel/router')

router.route('/').get((req, res) => {
  res.json({
    message: 'Example API!'
  })
})
router.use('/search', search)
router.use('/upload', upload)
router.use('/widget', widget)
router.use('/product-model', productModel)

router.use('/promocode', promocode)

router.use('/admin-user', adminUser)

router.use('/auth-admin', authAdmin)

router.use('/auth', auth)

router.use('/settings', settings)

router.use('/page', page)

router.use('/attribute', attribute)

router.use('/attribute-value', attributeValue)
router.use('/attribute-group', attributeGroup)

router.use('/module', appModule)
router.use('/currency', productCurrency)

router.use('/module-group', moduleGroup)

router.use('/language', language)


router.use('/product-label', productLabel)

router.use('/looks', looks)
router.use('/showroom', showroom)
router.use('/manufacturer', manufacturer)
router.use('/inspiration', inspiration)


router.use('/category', category)

router.use('/user', user)
router.use('/product', product)

module.exports = router