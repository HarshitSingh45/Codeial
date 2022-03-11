const nodemailer = require('../config/nodemailer');

// whenever a new comment is made i just need to call this mailer

// create a function which will send mail
// this is another way of exporting method module.exports.newComments = function(){}
exports.newComment = (comment) => {
    console.log('Inside newComment mailer');
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from: '500053523@stu.upes.ac.in',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    },(err, info) => {
        if(err) { console.log('error in sending mail, ',err); return}

        console.log('mail delivered ', info);
        return;
    })
}