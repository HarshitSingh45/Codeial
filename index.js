const express = require('express');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expresslayouts);
// extract styles and scripts from subpages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.error(`Error in running the server: ${err}`);
        return;
    }else{
        console.log(`Server is up & running on port: ${port}`);
    }
});