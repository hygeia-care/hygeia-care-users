var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/v1/auth/users', usersRouter);

// setup connection to mongo
const mongoose = require('mongoose');
const DB_URL = ('mongodb+srv://users_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/users')
console.log("Connecting to database: %s", DB_URL);

mongoose.connect(DB_URL);
const db = mongoose.connection;

// recover from errors
db.on('error', console.error.bind(console, 'db connection error'));

module.exports = app;
