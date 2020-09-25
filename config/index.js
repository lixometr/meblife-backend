const path = require('path')
const errorCodes = require('./errorCodes')
const config = {
  environment: process.env.NODE_ENV || 'dev',
  baseName: 'http://localhost:8080',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/example-api'
  },
  perPage: 2,
  JWT_SECRET: 'jwt_very_secret_key',
  JWT_ADMIN_SECRET: 'jwt_very_secret_key',
  JWT_EXPIRES: 1 * 60 * 60 * 24,
  JWT_EXPIRES_LONG: 2 * 60 * 60 * 24,
  JWT_ADMIN_EXPIRES: 1 * 60 * 60 * 24,
  IMAGE_FOLDER: path.join(__dirname, '..', '..', 'uploads'),
  langDir: path.join(__dirname, '..', 'lang'),
  errorCodes
}
config.IMAGE_PATH = `${config.baseName}/public/`
if (config.environment === 'development') {
  config.appUrl = 'http://localhost:3000'
}
module.exports = config
