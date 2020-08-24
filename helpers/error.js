module.exports = class AppError {
    constructor(statusCode, message) {
        this.statusCode = statusCode || 200
        this.message = message
    }
}