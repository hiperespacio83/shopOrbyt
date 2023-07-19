var express = require('express');
const { checkToken } = require('../src/helpers/middlewares');
var router = express.Router();

router.use('/products',checkToken, require('./api/products'));
router.use('/users',require('./api/users'))

module.exports = router;