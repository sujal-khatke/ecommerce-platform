const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Defin euser schema 
 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;