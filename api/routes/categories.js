const express = require('express')
mongoose = require('mongoose')
Category =  require('../../models/categories')
Product  = require('../../models/products')
router = express.Router()

router.get('/', (req, res, next) => {
    var search = req.query.search
    if (search != null) {
        var regex = "/^" + search + "/"
        console.log(search)
        Category.find({ "CategoryName": new RegExp(search, 'i') }).limit(10).exec((err, docs) => {
            if (err) {
                throw err
            }
            res.status(200).json({
                message: 'Handling GET Request to /api/categories',
                data: docs  
              });
        });
    } else {
        console.log('categories')
        Category.aggregate([
            {
                $sample:{
                    size: 40
                }
            }
        ]).exec((err, docs)=>{
            res.status(200).json({
              message: 'Handling GET Request to /api/categories',
              data: docs  
            });
        });
    }
    
});

router.get('/:name', (req, res, next) => {
    var name = req.params.name
    Product.find({"Category": name}).exec((err, docs)=>{
        if(err){
            throw err
        }
        console.log(docs)
        res.status(200).json({
            message: 'Handling GET Request to /api/categories/:id',
            data: docs
        });
    })
});

router.post('/:name', (req, res, next) => {
    var category = req.params.name;
    var upper = req.body.upper
    var lower = req.body.lower
    var sort  = req.body.sort
    var limit = req.body.limit
    if (upper == null || lower == null || sort == null || limit == null) {
        Product.find({"Category": category}).sort({"Price": 1}).exec((err, docs)=>{
            if(err){
                throw err
            }
            res.status(200).json({
                message: 'Handling GET Request to /api/categories/:name',
                data: docs
            });
        })
    }
    else{
        Product.find({$and: [{"Category": category}, {"Price": {$gte: lower, $lte: upper}}]}).sort({"Price": sort}).exec((err, docs)=>{
            if(err){
                throw err
            }
            res.status(200).json({
                message: 'Handling POST Request to /api/categories/:name',
                data: docs
            });
        })
    }
});

module.exports = router