const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const env = require('../config/environment');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({
    // we are not removing it from here and putting it into env variable because it can be used by other google api
        clientID: env.google_client_ID,
        clientSecret: env.google_client_Secret,
        callbackURL: env.google_callbackURL
    },
    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){ console.log('error in passport google oauth', err); return}

            console.log(profile);

            if(user){
                // if found set user as req.user
                return done(null, user);
            }else{
                // if not found, create users and set user as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){ console.log('error in creating user passport google oauth', err); return}

                    return done(null, user);

                })
            }
        })
    }
))

module.exports = passport;