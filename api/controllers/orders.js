var UserService    = require('../services/users')
var OrderService   = require('../services/orders')
var Cart           = require('../../models/carts')
var CartService    = require('../services/carts')
var EmailService   = require('../services/email')
var UserService    = require('../services/users')
exports.placeOrder = async function (req, res, next) {
    var data = req.body
    try {
        var CartId = data['UserId']
        try {
            // console.log(CartId)
            var cart = await CartService.getCart(CartId)
            if (cart['CartId'] === CartId && cart.CartDetails.length > 0) {
                // console.log(cart)
                // console.log('1')
                var newOrder   = await OrderService.placeOrder(data, cart)
                // console.log('2')
                var user      = await UserService.getUserEmail(CartId)
                var email = user['Email']
                // console.log('3')
                // var sent = await EmailService.sendEmail(newOrder, email)
                return res.status(200).json({ status: 200, order: newOrder, message: "Order Placed", error: null })

                // try{
                //     var sent = await EmailService.sendEmail(newOrder, email)
                // }
                // catch(err){
                //     throw err
                // }
                // finally{
                //     // console.log('4')
                //     return res.status(200).json({ status: 200, order: newOrder, message: "Order Placed", error: null })
                // }
                
            } else {
                return res.status(200).json({ status: 200, order: null, message: "Cart Empty", error: "Cart Empty" })
            }
        } catch (err) {
            return res.status(200).json({ status: 400, order: null, message: "User Does not Exist", error: "User Does not Exist" })
        }

    } catch (err) {
        return res.status(200).json({ status: 400, order: null, message: "Error in Placing Order", error: "Error in Placing Order" })
    }
}

exports.getOrders = async function (req, res, next) {
    try {
        var UserId = req.params.UserId
        var orders = await OrderService.getOrders(UserId)
        if (orders.length > 0) {
            return res.status(200).json({ status: 200, order: orders, message: "Orders", error: null })
        } else {
            return res.status(200).json({ status: 200, order: orders, message: "Orders Not Found", error: "Orders Not Found" })
        }
    } catch (err) {
        return res.status(200).json({ status: 400, order: null, message: "Error in Getting Orders", error: "Error in Getting Orders" })
    }
}
exports.getOrder = async function (req, res, next){
    try {
        var UserId  = req.params.UserId
        var OrderId = req.params.OrderId 
        var order = await OrderService.getOrder(UserId, OrderId)
        if (order) {
            return res.status(200).json({ status: 200, order: order, message: "Order Found", error: null })
        } else {
            return res.status(200).json({ status: 200, order: order, message: "Order Not Found", error: "Order Not Found" })
        }
    } catch (err) {
        return res.status(200).json({ status: 400, order: null, message: "Error in Getting Order", error: "Error in Getting Order" })
    }
}