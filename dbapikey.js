require('dotenv').config();
var mongoose = require("mongoose");


//const DB_URL = (process.env.DB_URL || 'mongodb://localhost')
//const DB_URL = "mongodb+srv://assurance:kUnHHe6RI5dWS2VZ@cluster0.miuwv1w.mongodb.net/bills" 
//const dbapikey = mongoose.createConnection('mongodb+srv://apikey_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/apikeys');

const dbApiKeyConnectionString = process.env.DB_API_KEY_CONNECTION_STRING;
const dbapikey = mongoose.createConnection(dbApiKeyConnectionString);
console.log("dbapikey.js / Connecting to database: %s", process.env.DB_API_KEY_CONNECTION_STRING);
dbapikey.on('error', console.error.bind(console, 'dbapikey connection error'));

module.exports = dbapikey