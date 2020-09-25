const config = require('../config')
const AppError = require('../helpers/error')
module.exports = () => (err, req, res, next) => {
  console.log(err)
  if (err instanceof AppError) {
    if (err.message || err.statusCode || err.errorCode) {
      if(err.statusCode === 401) {
        res.status(err.statusCode).json({status: err.statusCode, errorCode: config.errorCodes.noAuth})
        return
      }
      if(err.statusCode === 400) {
        res.status(err.statusCode).json({status: err.statusCode})
        return
      }
      if(err.statusCode === 404) {
        res.status(err.statusCode).json({status: err.statusCode})
        return
      }
      res.json({ error: err.message || true, status: err.statusCode, errorCode: err.errorCode })
    } else {
      res.sendStatus(err.statusCode)
    }
    return
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    res.status(401).json({status: 401, errorCode: config.errorCodes.noAuth})
    return
  }
  res.status(500).json({ error: err.message, status: 500 })
}