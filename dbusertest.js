require('dotenv').config();

var mongoose = require("mongoose");

const dbUserTestConnectionString = (process.env.DB_USER_TEST_CONNECTION_STRING || 'mongodb://localhost/test');
//const dbUserTestConnectionString = 'mongodb://localhost/test';
mongoose.connect(dbUserTestConnectionString);
const dbusertest = mongoose.connection;

console.log("dbusertest.js / Connecting to database: %s", dbUserTestConnectionString);
dbusertest.on('error', console.error.bind(console, 'dbusertest connection error'));

module.exports = dbusertest;