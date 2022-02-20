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

// check if the user is authenticated
// we will use this as middleware to check whether the user is signed in or not
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on to the next fn i.e controller action
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;