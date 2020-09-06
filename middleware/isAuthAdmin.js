module.exports = function (req, res, next) {
    req.headers['Authorization']
    req.adminUser = {
        name: "Test admin",
    }
    next()
}