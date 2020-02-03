var User = require('../../models/users')
var Cart = require('../../models/carts')
var bcrypt = require('bcrypt')

exports.addToCart = async function (data) {
    try {
        var price = parseInt(data['Price'])
        var quantity = parseInt(data['Quantity'])
        const detail = {
            ProductId: data['ProductId'],
            Price: price,
            ProductName: data['ProductName'],
            Quantity: quantity,
            Total: price * quantity
        }
        // console.log(detail)
        const cartData = {
            CartId: data['UserId'],
            CartTotal: 0,
            CartDetails: []
        }
        const newCart = await new Promise((resolve, reject) => {
            Cart.findOne({ "CartId": cartData.CartId }).exec((err, cart) => {
                if (err) {
                    throw err
                }
                // console.log(cart)
                var cart_id = cart['CartId']
                var total   = cart['CartTotal'] + detail.Total
                // console.log(cart[0])
                var query = { "CartId": cart_id }
                update = {
                    $set: { "CartTotal": total},
                    $push: {"CartDetails": detail}
                }
                options = {upsert: true};
                Cart.updateOne(query, update, options, async (err, cart1)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(cart1)
                });
            });
        });
        // console.log(newCart)
        return newCart
    } catch (err) {
        throw err
    }
}
exports.getCart = async function (CartId) {
    try {
        var cart = await Cart.findOne({ "CartId": CartId });
        // console.log(cart)
        return cart
    } catch (err) {
        throw err
    }
}
exports.makeCart = async function (data) {
    try {
        const cart = {
            CartId: data['UserId'],
            CartTotal: 0,
            CartDetails: []
        }
        var price = parseInt(data['Price'])
        var quantity = parseInt(data['Quantity'])
        const detail = {
            ProductId: data['ProductId'],
            Price: price,
            ProductName: data['ProductName'],
            Quantity: quantity,
            Total: price * quantity
        }
        cart.CartDetails.push(detail)
        cart.CartTotal = detail.Total
        // console.log(cart)
        const newCart = new Cart(cart)
        newCart.save((err, cart) => {
            if (err) {
                throw err
            }
            // console.log("Cart Created Successfully...!!")
            // console.log(cart)
        });
        return newCart
    } catch (err) {
        throw err
    }
}
exports.removeCart = async function(CartId){
    try{
        const newCart = await new Promise((resolve, reject) => {
            Cart.findOne({ "CartId": CartId }).exec((err, cart) => {
                if (err) {
                    throw err
                }
                // console.log(cart)
                var cart_id = cart['CartId']
                var total   = 0
                var query = { "CartId": cart_id }
                update = {
                    $set: { "CartTotal": total, "CartDetails": []}
                }
                Cart.updateOne(query, update, async (err, cart1)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(cart1)
                });
            });
        });
        return newCart
        
    }catch(err){
        throw err
    }
} 
exports.removeCartItem = async function(CartId, ItemId){
    try{
        const newCart = await new Promise((resolve, reject) => {
            Cart.findOne({ "CartId": CartId }).exec((err, cart) => {
                if (err) {
                    throw err
                }
                // console.log('2')
                const itemData = {
                    "id": null,
                    "total": null
                }
                cart.CartDetails.forEach((item)=>{
                    if(item._id == ItemId){
                        // console.log('3 item._id found')
                        itemData.id = item._id
                        itemData.total = item.Total
                    }
                });
                var cart_id = cart['CartId']
                var total   = cart['CartTotal'] - itemData.total
                var query = { "CartId": cart_id }
                var update = {
                     $set: { "CartTotal": total },
                     $pull: { "CartDetails" : { "_id" : itemData.id } } 
                }
                var options = { safe: true}
                Cart.updateOne(query, update, options, async (err, cart1)=>{
                    if(err){
                        reject(err)
                    }
                    // console.log('4 Updated')
                    resolve(cart1)
                });
            });
        });
        return newCart
        
    }catch(err){
        throw err
    }
}