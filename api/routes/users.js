var express = require('express');
var router = express.Router();

var UserController = require('../controllers/users')

router.get('/', UserController.getUsers)
router.post('/register', UserController.addUser)
router.post('/login', UserController.userLogin)
router.post('/password/forgot', UserController.userForgotPassword)
router.post('/password/reset', UserController.resetPassword)
module.exports = router;