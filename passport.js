const passport = require("passport");
const Bearer = require('passport-http-bearer').Strategy;
const ApiKey = require('./models/apikey');


passport.use(new Bearer (
    async (token, cb) => {
        try {
            const user = await ApiKey.findOne({ apikey: token });
            if (!user) {
                return cb(null, false, { message: 'Unknown apikey ' + token });
            }

            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }
));

module.exports = passport;