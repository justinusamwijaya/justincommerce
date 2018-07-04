const router = require('express').Router()
const controller = require('../controllers').staticController
const { validation } = require('../middleware'),
    validateUser = validation.authenticateToken,
    validateSignup = [validation.signupValidator, validation.validate]

router.post('/login', controller.login)
router.post('/signup', ...validateSignup, controller.signup)
router.get('/getCart', validateUser, controller.getCart)
router.put('/addtocart', validateUser, controller.addToCart)
router.put('/checkout', validateUser, controller.checkout)

module.exports = router