const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const bluebird = require('bluebird')
const cors = require('cors')
const config = require('./config')
const routes = require('./routes')

const requestMiddleware =require('./middleware/request')
const adminSettings = require('./middleware/adminSettings')
const errorHandler = require('./middleware/errorHandler')

const app = express()

mongoose.Promise = bluebird
mongoose.connect(config.mongo.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
app.use('/public', express.static('../uploads'));

app.use(cors())
app.use(helmet())

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(morgan('tiny'))

app.use(adminSettings())
app.use(requestMiddleware())

app.use('/', routes)

app.use('*', (req, res) => {
  res.status(404).json({ code: 404, message: 'Not Found' })
})

app.use(errorHandler())

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`)
})

module.exports = app
