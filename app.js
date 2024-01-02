var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // importamos CORS


const passport = require('./passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(cors()); // Aplicamos CORS a todas las rutas

require('dotenv').config();

app.use('/', indexRouter);
app.use('/api/v1/auth/users', usersRouter);

module.exports = app;
