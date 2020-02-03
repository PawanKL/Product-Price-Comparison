const mongoose = require('mongoose');
const Schema  = mongoose.Schema

const ProductSchema = new Schema({
  _id: {
      type: Schema.Types.ObjectId,
      required: true
  },
  ProductId: {
    type: Number,
    required: true
  },
  ProductName: {
      type: String,
      required: true
  },
  ProductPage: {
    type: String,
    required: true
  },
  ProductImage:{
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  DiscountPrice:{
    type: Number,
    required: true
  },
  Category:{
      type: String,
      required: true
  },
  Site:{
      type: String,
      required: true
  }
});

const Product = mongoose.model('Product', ProductSchema, 'Products');

module.exports = Product