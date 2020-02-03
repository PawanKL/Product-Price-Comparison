const express = require('express')
ObjectId = require('mongodb').ObjectId
mongoose = require('mongoose')
Product  = require('../../models/products')
router = express.Router()

// Getting Random Products on (GET) /api/products
router.get('/', (req, res, next) => {
    var search = req.query.search
    if (search != null) {
        var regex = "/^" + search + "/"
        var selector = { "ProductName": { "$regex": regex } }
        console.log(search)
        Product.find({ "ProductName": new RegExp(search, 'i') }).limit(10).exec((err, docs) => {
            if (err) {
                throw err
            }
            res.status(200).json({
                message: 'Handling GET Request to /api/products',
                data: docs  
              });
        });
    } else {
        console.log('products')
        Product.aggregate([
            {
                $sample: {
                    size: 100
                }
            }
        ]).exec((err, docs) => {
            res.status(200).json({
                message: 'Handling GET Request to /api/products',
                data: docs  
              });
        });
    }
});

// Getting Products with Inputs (upper, lower, sort(1, -1) ===> (ascending, descending)) On (POST) /api/products
router.post('/', (req, res, next) => {
    var upper = req.body.upper
    var lower = req.body.lower
    var sort  = req.body.sort
    if (lower == null || upper == null || sort == null) {
        Product.find({}).sort({"Price": 1}).exec((err, docs)=>{
            if(err){
                throw err
            }
            res.status(200).json({
                message: 'Handling POST Request to /api/products',
                data: docs  
            });
        })
    } else {
        Product.find({"Price": {$gte: lower, $lte: upper}}).sort({"Price": sort}).exec((err, docs)=>{
            if(err){
                throw err
            }
            res.status(200).json({
                message: 'Handling POST Request to /api/products',
                data: docs
            });
        });
    }
});

//Getting Product On (GET) /api/products/:id 
router.get('/:id', (req, res, next) => {
    var id = parseInt(req.params.id)
    Product.findOne({"ProductId": id}).exec((err, docs)=>{
        if(err){
            throw err
        }
        res.status(200).json({
            message: 'Handling GET Request to /api/products/:id',
            data: docs
        });
    });
});

module.exports = router