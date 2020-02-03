var UserService = require('../services/users')
var CartService = require('../services/carts')
var Cart = require('../../models/carts')
exports.getCart = async function(req, res, next){
    try{
        var CartId =  req.params.UserId
        // console.log(CartId)
        var newCart = await CartService.getCart(CartId)
        return res.status(200).json({ status: 200, cart: newCart, message: "Cart Success", error: null });
    }catch(err){
        return res.status(200).json({ status: 200, cart: null, message: "Cart Not Found", error: "Cart Not Found" });        
    }
}
exports.addToCart = async function(req, res, next){
    var data = req.body
    try{
        // var user = await UserService.findUser(data['PhoneNumber'])
        var cart = await CartService.getCart(data['UserId']);
        // console.log(cart)
        // console.log(cart.length)
        if(cart == null){
            var newCart = await CartService.makeCart(data)
            // console.log(newCart)
            return res.status(200).json({ status: 200, cart: newCart, message: "Cart Created", error: null });
        }else if(cart.CartId == data['UserId']){
            var newCart = await CartService.addToCart(data)
            var cart = await CartService.getCart(data['UserId']);
            return res.status(200).json({ status: 200, cart: cart, message: "Cart Updated", error: null });      
        }else{
            return res.status(200).json({ status: 200, cart: null, message: "Cart Mismatch", error: "Cart Mismatch" });      
        }
        // if(cart.CartId  == data['UserId']){
        //     var newCart = await CartService.addToCart(data)
        //     var cart = await CartService.getCart(data['UserId']);
        //     return res.status(200).json({ status: 200, cart: cart, message: "Cart Updated", error: null });
        // }else{
        //     var newCart = await CartService.makeCart(data)
        //     console.log(newCart)
        //     return res.status(200).json({ status: 200, cart: newCart, message: "Cart Created", error: null });
        // }
        
    }catch(err){
        return res.status(400).json({ status: 200, cart: null, message: "Error in Creating Cart", error: "Error in Creating Cart" });
    }
}

exports.removeCart = async function(req, res, next){
    try{
        var CartId  =  req.params.UserId
        var cart = await CartService.getCart(CartId)
        if(cart.CartId  == CartId){
            var newCart = await CartService.removeCart(CartId);
            newCart = await CartService.getCart(CartId);
            return res.status(200).json({ status: 200, cart: newCart, message: "Cart Removed", error: null});
        }else{
            return res.status(200).json({ status: 200, cart: null, message: "Cart Not Exist", error: "Cart Not Exist"});
            
        }

    }catch(err){
        return res.status(400).json({ status: 200, cart: null, message: "Error in Removing Cart", error: "Error in Removing Cart" });

    }
}
exports.removeCartItem = async function(req, res, next){
    try{
        var CartId  =  req.params.UserId
        var ItemId  = req.params.ItemId
        var cart = await CartService.getCart(CartId)
        if(cart.CartId  == CartId){
            // console.log('1')
            var newCart = await CartService.removeCartItem(CartId, ItemId);
            newCart = await CartService.getCart(CartId);
            return res.status(200).json({ status: 200, cart: newCart, message: "Item Removed from Cart", error: null});
        }else{
            return res.status(200).json({ status: 200, cart: null, message: "Cart Not Exist", error: "Cart Not Exist"});
            
        }

    }catch(err){
        return res.status(400).json({ status: 200, cart: null, message: "Error in Removing Item", error: "Error in Removing Cart" });

    }
}