const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
// importing module to extract header from jwt
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
// while defining jwt strategy we need to have options 1 encryption
// header is a list of keys which includes authorization, thet have several keys which includes bearer,
//  that bearer will have the jwt token
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'

}
// here we are matching jwt, once the user jwt is created this is used sfter that to authenticate the user
passport.use(new JWTStrategy(opts, function(jwtPayload, done) {
    User.findById(jwtPayload._id, function(err, user){
        if(err){ console.log('error in finding user from jwt'); return}
        if (user) {
            return done(null, user); // error is null
        }else{
            return done(null, false); // false means the user was not found
            // or you could create a new account
        }
    })
}));

module.exports = passport;
