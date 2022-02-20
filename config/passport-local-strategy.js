// require passport
const passport = require('passport');
// require strategy
const LocalStrategy = require('passport-local').Strategy;
// import user collection
const user = require('../models/users');
// we need to tell passport to use the local strategy for authentication
// authentication using passport
passport.use(new LocalStrategy({
    // we are telling here what is our username field in our schema ig it should be unique
    usernameField: 'email'
    },
    function(email , password, done){
        // find a user and establish the identity
        user.findOne({email: email}, function(err, User){
            // in findOne(first email is property name and second email is the value)
            if(err){
                console.log('Error in finding the user --> Passport')
                // done fn takes two argument 1- err 2- something else
                // done will report error to passport
                return done(err);
            }
            if(!User || User.password != password){
                console.log('Invalid Username/Pasword');
                return done(null, false); // false indicates authentication failed
            }
            // if user found
            return done(null, User);
        });
    }

));

// serializing the user to decide which key to be kept in the cookie
passport.serializeUser(function(User, done){
    done(null, User.id); // we just want to store user id in encrypted format in cookie
});
// deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done){
    user.findById(id, function(err, User){
        if(err){
            console.log('Error in finding the user --> Passport');
            return done(err);
        }
        return done(null, User);
    });
});

module.exports = passport;