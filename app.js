const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});


const app = express();

const port = 3000;

const users = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

app.get('/', (req, res) =>{
  res.send('Invalid endpoint');
});

app.listen(port, (req, res) => {
  console.log("server started on port " + port);
});