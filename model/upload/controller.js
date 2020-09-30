const Controller = require('../../lib/controller')
const multer = require('multer')
const AppError = require('../../helpers/error')
const config = require('../../config')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.IMAGE_FOLDER)
    },
    filename: function (req, file, cb) {
        const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename)
    }
})

const upload = multer({ storage, limits: { fileSize: 10 * 1000000 } })

class UploadController extends Controller {
    async image(req, res, next) {
        try {
            upload.single('image')(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    throw new AppError(500, 'Loading File Error')
                } else if (err) {
                    throw new AppError(500, err)
                }
                if (!req.file) {
                    throw new AppError(400, 'No file')
                }
                const imagePath = `${config.IMAGE_PATH}${req.file.filename}`
                res.json({
                    ok: true,
                    url: imagePath,
                })
            })
        } catch (err) {
            next(err)
        }
    }
    async file(req, res, next) {
        try {
            upload.single('file')(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    throw new AppError(500, 'Loading File Error')
                } else if (err) {
                    throw new AppError(500, err)
                }
                if (!req.file) {
                    throw new AppError(400, 'No file')
                }
                const filePath = `${config.FILE_PATH}${req.file.filename}`
                res.json({
                    ok: true,
                    url: filePath,
                })
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UploadController()
