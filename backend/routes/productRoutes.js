const router = require('express').Router()
const controller = require('../controllers').productController
const { validation, uploadImg } = require('../middleware'),
    validateUser = validation.authenticateToken,
    uploadFunction = [uploadImg.multer.single('img'), uploadImg.sendUploadToGCS]


router.post('/', validateUser, ...uploadFunction, controller.addProduct)
router.get('/',controller.getAllProduct)
router.get('/user/:id',controller.getAllProduct)
router.get('/:id',controller.getOneProduct)
router.put('/:id',  validateUser, ...uploadFunction, controller.updateProduct)
router.delete('/:id', validateUser, controller.deleteProduct)


module.exports = router