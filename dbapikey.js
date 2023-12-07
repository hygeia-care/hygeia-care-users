var mongoose = require("mongoose");

const dbapikey = mongoose.createConnection('mongodb+srv://apikey_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/apikeys');
console.log("dbapikey.js / Connecting to database: %s", 'mongodb+srv://apikey_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/apikeys');
dbapikey.on('error', console.error.bind(console, 'dbapikey connection error'));

module.exports = dbapikey