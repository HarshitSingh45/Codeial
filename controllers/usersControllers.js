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

// create action
module.exports.create = function(req, res){
    // TODO later
}

// create session acion
module.exports.createSession = function(req, res){
    // TODO later
}