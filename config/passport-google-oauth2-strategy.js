const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID: '509234467734-3lu76uo6plclqeguha7hrark10ho8dft.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'
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