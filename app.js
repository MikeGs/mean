const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const users = require('./routes/users');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});

// EXPRESS 
const app = express();

// Port
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) =>{
  res.send('Invalid endpoint');
});

app.listen(port, (req, res) => {
  console.log("server started on port " + port);
});