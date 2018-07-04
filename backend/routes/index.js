const router = require('express').Router();
const staticRoutes = require('./staticRoutes');
const productRoutes = require('./productRoutes')

router
.use('/',staticRoutes)
.use('/products',productRoutes)


module.exports = router