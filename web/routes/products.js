const express  = require('express')
const router   = express.Router()
const Product  = require('../../models/products')     

router.get(':id', (req, res, next) => {
    var id = parseInt(req.params.id)
    Product.findOne({"ProductId": id}).exec((err, docs)=>{
        if(err){
            throw err
        }
        res.render('product', {product: docs})
    })
});

module.exports = router