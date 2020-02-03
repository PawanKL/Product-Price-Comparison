const mongoose = require('mongoose');
const Schema  = mongoose.Schema

const OrderSchema = new Schema({
  UserId: {
      type: String,
      required: true
  },
  City: {
      type: String,
      required: true
  },
  Address: {
      type: String,
      required: true
  },
  AlternateAddress: {
      type: String
  },
  AlternateContact:{
      type: String,

  },
  OrderTotal:{
    type: Number,
    required: true
  },
  OrderDetails: [
      {
          ProductId:{
              type: Number,
          },
          ProductName: {
              type: String,
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
  ],
  OrderDate: {
      type: Date,
      default: Date.now()
  }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order