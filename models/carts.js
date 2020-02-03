const mongoose = require('mongoose');
const Schema  = mongoose.Schema

const CartSchema = new Schema({
  CartId: {
    type: String,
    unique: true,
    required: true
  },
  CartTotal:{
      type: Number
  },
  CartDetails: [
      {
          ProductId:{
              type: Number,
          },
          ProductName: {
              type: String
          },
          Price: {
              type: Number,
          },
          Quantity: {
              type: Number,
          },
          Total: {
              type: Number,
          }
      }
  ]
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart