const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', // search gmail smtp settings
    port: 587,
    secure: false,
    // establishing identity with which you will be sending mail
    auth: {
        user: '500053523@stu.upes.ac.in',
        pass: 'UPes@123'
    }
});

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