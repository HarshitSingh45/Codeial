module.exports.user = function(req,res){
    return res.render('users', {
        title: 'user page'
    });
}

// Signup action
module.exports.signup = function(req,res){
    return res.render('signup', {
        title: 'Codeial | Signup'
    })
}

// signin action
module.exports.signin = function(req,res){
    return res.render('signin', {
        title: 'Codeial | SignIn'
    })
}