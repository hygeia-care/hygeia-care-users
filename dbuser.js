require('dotenv').config();
var mongoose = require("mongoose");

//'mongodb+srv://users_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/users'
//'mongodb://mongoadmin:secret@localhost:27017/'

//const dbuser = mongoose.createConnection('mongodb+srv://users_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/users');
//console.log("dbuser.js / Connecting to database: %s", 'mongodb+srv://users_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/users');
//dbuser.on('error', console.error.bind(console, 'dbuser connection error'));

const dbUserConnectionString = process.env.DB_USER_CONNECTION_STRING;
const dbuser = mongoose.createConnection(dbUserConnectionString);
console.log("dbuser.js / Connecting to database: %s", process.env.DB_USER_CONNECTION_STRING);
dbuser.on('error', console.error.bind(console, 'dbuser connection error'));


module.exports = dbuser