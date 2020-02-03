const mongoose = require('mongoose');
const Schema  = mongoose.Schema

const CategorySchema = new Schema({
  _id: {
      type: Schema.Types.ObjectId,
      required: true
  },
  CategoryId: {
    type: Number,
    required: true
  },
  CategoryName: {
      type: String,
      required: true
  },
  CategoryImage:{
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', CategorySchema, 'Categories');

module.exports = Category