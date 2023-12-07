const mongoose = require('mongoose');
const dbapikey= require("../dbapikey");
const { stringify } = require('uuid');
const {v4: uuidv4} = require('uuid');

const apiKeySchema = new mongoose.Schema ({
    user: String,
    apikey: String
});

/*
// Definición de la conexión para la colección apikeys
const dbapikey = mongoose.createConnection('mongodb+srv://apikey_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/apikeys');
console.log("apikey.js / Connecting to database: %s", 'mongodb+srv://apikey_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/apikeys');
dbapikey.on('error', console.error.bind(console, 'dbapikey connection error'));
*/

// Definición del modelo utilizando la conexión específica para apikeys
const Apikey = dbapikey.model('ApiKey', apiKeySchema);



module.exports = Apikey;

