const express = require('express')
const router = express.Router()
const Product = require('../../models/products')
const Category = require("../../models/categories")
const User = require('../../models/users')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
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
            res.render('index', { products: docs })
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
            res.render('index', { products: docs })
        });
    }
});

router.get('/products/:id', (req, res, next) => {
    var id = parseInt(req.params.id)
    Product.findOne({ "ProductId": id }).exec((err, docs) => {
        if (err) {
            throw err
        }
        res.render('product', { product: docs })
    });
});

router.get('/categories', (req, res, next) => {
    var search = req.query.search
    if (search != null) {
        console.log(search)
        Category.find({ "CategoryName": new RegExp(search, 'i') }).exec((err, docs) => {
            if (err) {
                throw err
            }
            res.render('category', { categories: docs })
        });
    } else {
        Category.aggregate([
            {
                $sample: {
                    size: 40
                }
            }
        ]).exec((err, docs) => {
            res.render('category', { categories: docs })
        });
    }
});
router.get('/categories/:id', (req, res, next) => {
    var id = req.params.id
    var search = req.query.search
    if (search == null) {
        Category.findOne({ "CategoryId": id }).exec((err, docs) => {
            if (err) {
                throw err
            }
            console.log(docs)
            var categoryName = docs['CategoryName']
            Product.find({ "Category": categoryName }).limit(21).exec((err, docs) => {
                if (err) {
                    throw err
                }
                res.render("categoryProducts", { products: docs })
            });
        });
    } else {
        Category.findOne({ "CategoryId": id }).exec((err, docs) => {
            if (err) {
                throw err
            }
            var categoryName = docs['CategoryName']
            Product.find({ "Category": categoryName, "ProductName": new RegExp(search, 'i') }).exec((err, docs) => {
                if (err) {
                    throw err
                }
                res.render('index', { products: docs })
            });
        });

    }

});
router.get('/password/forgot/:email/:token', (req, res) => {
    var email = req.params.email
    User.findOne({ "Email": email }).exec((err, user) => {
        if (err) {
            throw err
        }
        console.log(user)
        const secret = user.Password + '-' + user.CreatedAt
        var token = req.params.token
        try {
            var decoded = jwt.verify(token, secret);
            console.log(decoded)
            res.render('forgot', { email: user.Email, tokenError: null, updatedPassword: null, match: null })
        } catch (err) {
            res.render('forgot', { email: user.Email, tokenError: 'Invalid Token', updatedPassword: null, match: null })
        }
    });
})
router.post('/password/forgot', (req, res) => {
    var email = req.body.email
    if(req.body.newPassword != req.body.confirmPassword){
        return res.render('forgot', { email: email, tokenError: null, updatedPassword: null, match: "not match" })
    }
    const password = req.body.newPassword
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            throw err
        }
        var query = { "Email": email }
        update = {
            $set: { "Password": hash }
        }
        User.updateOne(query, update, (err, user) => {
            if (err) {
                throw err
            }
            console.log(user)
            return res.render('forgot', { email: user.Email, tokenError: null, updatedPassword: "updated", match: null })
        });
    });
});
// router.post('/', (req, res, next) => {
//     var upper = req.body.upper
//     var lower = req.body.lower
//     var sort = req.body.sort
//     var db = req.app.locals.db
//     if (lower == null || upper == null || sort == null) {
//         db.collection('Products').find({}).sort({ "Price": 1 }).toArray((err, docs) => {
//             if (err) {
//                 throw err
//             }
//             res.status(200).json({
//                 message: 'Handling POST Request to /api/products',
//                 data: docs
//             });
//         });
//     } else {
//         db.collection('Products').find({ "Price": { $gte: lower, $lte: upper } }).sort({ "Price": sort }).toArray((err, docs) => {
//             if (err) {
//                 throw err
//             }
//             res.status(200).json({
//                 message: 'Handling POST Request to /api/products',
//                 data: docs
//             });
//         });
//     }
// });


module.exports = router