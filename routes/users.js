const express = require('express');
const router = express.Router();

router.get('/register', (req, res, nect) => {
  res.send('REGISTER');
});

router.post('/authenticate', (req, res, nect) => {
  res.send('AUTHENTICATE');
});

router.get('/profile', (req, res, nect) => {
  res.send('PROFILE');
});

router.get('/validate', (req, res, nect) => {
  res.send('VALIDATE');
});

module.exports = router;