const AppError = require('../helpers/error')
module.exports = () => (err, req, res, next) => {
  console.log(err)
  if (err instanceof AppError) {
    if (err.message) {
      res.json({ error: err.message, status: err.statusCode })
    } else {
      res.sendStatus(err.statusCode)
    }

    return
  }
  res.status(500).json({ error: err.message, status: 500 })
}