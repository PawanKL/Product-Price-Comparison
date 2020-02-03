var express = require('express');
var router = express.Router();

var OrderController = require('../controllers/orders')

router.post('/', OrderController.placeOrder)
router.get('/:UserId', OrderController.getOrders)
router.get('/:UserId/:OrderId', OrderController.getOrder)


module.exports = router;