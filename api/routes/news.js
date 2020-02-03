var express = require('express');
var router = express.Router();

var NewsController = require('../controllers/news')

router.get('/', NewsController.getAll)
// router.get('/:UserId', News.topHeadlines)
// router.get('/:UserId/:OrderId', OrderController.getOrder)


module.exports = router;