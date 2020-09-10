const path = require('path')
const config = {
    environment: process.env.NODE_ENV || 'dev',
    baseName: 'http://localhost:8080',
    server: {
      port: process.env.PORT || 8080
    },
    mongo: {
      url: process.env.MONGO_DB_URI || 'mongodb://localhost/example-api'
    },
    productsPerPage: 30,
    JWT_SECRET: 'jwt_very_secret_key',
    JWT_EXPIRES: 1 * 60 * 60 * 24,
    IMAGE_FOLDER: path.join(__dirname, '..', '..', 'uploads'),
  }
  config.IMAGE_PATH = `${config.baseName}/public/`
  
  module.exports = config
  