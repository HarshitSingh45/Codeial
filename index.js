const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
// const multer = require('multer');
const port = 8000;
const db = require('./config/mongoose')
const expresslayouts = require('express-ejs-layouts');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chatServer to be used with socket.io
const chatServer = require('http').Server(app);
// we pass on this charServer to chatSocket
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000);
console.log('chat box is listening on port: 5000')

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.assets_path));
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expresslayouts);
// extract styles and scripts from subpages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// app.use('/', require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Codeial',
    // TODO change secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(db)
    // store: MongoStore.create({ mongoUrl: 'mongodb://localhost/codeial_development' })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.error(`Error in running the server: ${err}`);
        return;
    }else{
        console.log(`Server is up & running on port: ${port}`);
    }
});