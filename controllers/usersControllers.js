const user = require('../models/users');

module.exports.user = function(req,res){
    user.findById(req.params.id, function(err, User){
        return res.render('users', {
            title: 'user page',
            profile_user: User
        });
    })   
}

// Signup action
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signup', {
        title: 'Codeial | Signup'
    })
}

// signin action
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signin', {
        title: 'Codeial | SignIn'
    })
}

// create action
module.exports.create = function(req, res){
    // validating password and confirm password is same or not
    console.log('creating user');
    if(req.body.password != req.body.Cpassword ){
        return res.redirect('back');
    }

    user.findOne({email: req.body.email}, function(err, User){
        if(err){console.log('Error in finding the user'); return}

        if(!User){
            user.create(req.body, function(err, User){
                if(err){console.log('Error in creating user while signup',err); return}

                return res.redirect('/users/signin');
            });
        }else{
            return res.redirect('back');
        }
    })

}

// create session acion
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

// destroy session
module.exports.destroySession = function(req,res){
    req.logOut();
    return res.redirect('/');
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        user.findByIdAndUpdate(req.params.id , req.body , function(err, User){
            return res.redirect('back');

        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}