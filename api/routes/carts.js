var express = require('express');
var router = express.Router();

var CartController = require('../controllers/carts')

router.post('/', CartController.addToCart)
router.get('/:UserId', CartController.getCart)
router.get('/delete/:UserId', CartController.removeCart)
router.get('/delete/:UserId/:ItemId', CartController.removeCartItem)

module.exports = router;