const mongoose = require('mongoose');
const Schema  = mongoose.Schema

const UserSchema = new Schema({
  PhoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  Password:{
      type: String,
      required: true
  },
  FirstName: {
      type: String,
  },
  LastName: {
    type: String,
  },
  Email:{
    type: String,
    required: true,
    unique: true,
  },
  City: {
    type: String,
    required: true
  },
  Address: {
    type: String,
  },
  CreatedAt: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User