// setup connection to mongo
const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');
// const DB_URL_APIKEY = (process.env.DB_URL_APIKEY || 'mongodb://localhost/test');
const DB_URL_APIKEY = ('mongodb+srv://apikey_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/apikeys');
console.log("Connecting to database: %s", DB_URL_APIKEY);

mongoose.connect(DB_URL_APIKEY);
const dbapikey = mongoose.connection;
const ApiKey = require('./models/apikey');


dbapikey.on("connected", async () => {
    const generatedApikey = uuidv4();
    const user = new ApiKey({user: "fis", apikey: generatedApikey});
    /*
    user.save(function(err,user){
        if(err){
            console.err(err);
        } else {
            console.log('user: ' + user.user + ", apiKey: " + user.apikey + " saved");
        }
        mongoose.connection.close();
    })
*/
    try {
        // Save the user using async/await
        const savedUser = await user.save();
        console.log('User:', savedUser.user, 'API Key:', savedUser.apikey, 'saved');
    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection after saving
        mongoose.connection.close();
    }

});





