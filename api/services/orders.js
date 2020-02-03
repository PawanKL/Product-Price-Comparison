var User = require('../../models/users')
var Order = require('../../models/orders')
var CartService = require('./carts')
exports.placeOrder = async function(data, cart){
    try{
        const order = {
            UserId: data['UserId'],
            Address: data['Address'],
            City: data['City'],
            AlternateAddress: data['AlternateAddress'],
            OrderTotal: cart.CartTotal,
            OrderDetails: cart.CartDetails
        }
        const newOrder = new Order(order)
        newOrder.save((err)=>{
            if(err){
                throw err
            }
        });
        return newOrder
    }catch(err){
        throw err
    }
}
exports.getOrders = async function(UserId){
    try{
        var orders = await new Promise((resolve, reject)=>{
            Order.find({"UserId": UserId}).exec((err, data)=>{
                if(err){
                    reject(err)
                }
                resolve(data)
            });
        });
        return orders

    }catch(err){
        throw err
    }
}
exports.getOrder = async function(UserId, OrderId){
    try{
        var order = await new Promise((resolve, reject)=>{
            Order.findOne({"UserId": UserId, "_id": OrderId}).exec((err, data)=>{
                if(err){
                    reject(err)
                }
                resolve(data)
            });
        });
        return order

    }catch(err){
        throw err
    }
}