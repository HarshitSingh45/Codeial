const development = {
    name: 'development',
    assets_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com', // search gmail smtp settings
        port: 587,
        secure: false,
        // establishing identity with which you will be sending mail
        auth: {
            user: '500053523@stu.upes.ac.in',
            pass: 'UPes@123'
        }
    },
    google_client_ID: '509234467734-3lu76uo6plclqeguha7hrark10ho8dft.apps.googleusercontent.com',
    google_client_Secret: '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',
    google_callbackURL: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codeial',

}

const production  = {
    name: 'production',
}

module.exports = development;