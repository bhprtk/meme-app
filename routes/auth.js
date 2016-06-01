'use strict';

var express = require('express');
var request = require('request');
var qs = require('querystring');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var router = express.Router();

var User = require('../models/user');

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function(err, user) {

    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
      res.send({ token: User.createJWT(user) });
    });
  });
});

router.post('/signup', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken' });
    }

    bcrypt.hash(req.body.password, 12, (err, hash) => {
      var user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hash
      });
      user.save(function(err, result) {
        if (err) {
          res.status(500).send({ message: err.message });
        }
        res.send({ token: User.createJWT(result) });
      });
    });

  });
});

module.exports = router;
