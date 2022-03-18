const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('../config/environment');

let transporter = nodemailer.createTransport(env.smtp);

// defining that we will be using ejs
let renderTemplate = (data, relativePath) => {
    let mailHTML; // defining variable where we'll be storing html which will sent with mail
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath), // relativePath is the place from which this function will be called
        data,
        function(err, template){
            if(err){ console.log('error in rendering template'); return}

            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}