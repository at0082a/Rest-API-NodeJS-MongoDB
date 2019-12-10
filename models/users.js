const mongoose = require('mongoose');
// const validator = require('validator');
const joi = require('joi');

const userSchema = mongoose.Schema({
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  }
});

const validateUser = (user) => {
    const schema = {
        email: joi.string(),
        password: joi.string()
    };
    return joi.validate(user, schema);
};

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateUser;