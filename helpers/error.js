const config = require('../config/index')
module.exports = class AppError {
    constructor(statusCode, message, errorCode) {
        this.statusCode = statusCode || 200
        this.message = message
        if (errorCode !== undefined) {
            if (typeof errorCode === 'string') {
                this.errorCode = config.errorCodes[errorCode]
            } else {
                this.errorCode = errorCode
            }
        }

    }
}