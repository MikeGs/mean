const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


router.post('/register', (req, res, nect) => {
  let newUser = new User({
    name: req.body.name, 
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    }else{
      res.json({success: true, msg: 'User registered'});
    }
  });
});

router.post('/authenticate', (req, res, nect) => {
  res.send('AUTHENTICATE');
});

router.get('/profile', (req, res, nect) => {
  res.send('PROFILE');
});

module.exports = router;