const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  }
});

userSchema.pre('save', (next) => {
  // Hash the password before saving the user model
  let hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;