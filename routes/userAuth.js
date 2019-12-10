const express = require('express');
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

let validation = passport.use(new BasicStrategy ((username, password, done) =>  {
  User.findOne({ username: username }, (err, user) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    } else if (err) {
      return done(null, err);
    }
    return done(null, false);
    });
  }
));

router.get('/api/auth', passport.authenticate('basic', {session: false}), (req, res) => {
  res.send('You have been authenticated' + req.user.username);
});

module.exports = validation;