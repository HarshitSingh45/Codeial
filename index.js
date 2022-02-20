const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose')
const expresslayouts = require('express-ejs-layouts');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expresslayouts);
// extract styles and scripts from subpages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// app.use('/', require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'Codeial',
    // TODO change secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.error(`Error in running the server: ${err}`);
        return;
    }else{
        console.log(`Server is up & running on port: ${port}`);
    }
});