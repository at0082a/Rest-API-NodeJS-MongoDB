const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/users');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
 
router.post('/auth', async (req, res) => {

  //validate the http request
  const { error } = validate(req.body);
  if (error) {
      return res.status(400).send(error.details[0].message);
  }

  //  Now find the user by their email address
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Incorrect email or password.');
  }

  // Then validate the Credentials in MongoDB match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
      return res.status(400).send('Incorrect email or password.');
  }

  const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

const validate = (req) => {
  const schema = {
      email: Joi.string(),
      password: Joi.string()
  };
  return Joi.validate(req, schema);
};
 
module.exports = router;