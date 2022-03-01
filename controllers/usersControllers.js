const user = require('../models/users');

module.exports.user = async function(req,res){
    try{
        let User = await user.findById(req.params.id);
        return res.render('users', {
            title: 'user page',
            profile_user: User
        });
    }catch(err){
        console.log(`Error occured in finding the user profile ${err}`)
    }    
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
module.exports.create = async function(req, res){
    try{
        // validating password and confirm password is same or not
        console.log('creating user');
        if(req.body.password != req.body.Cpassword ){
            return res.redirect('back');
        }

        let User = await user.findOne({email: req.body.email});
        if(!User){
            let USER = await user.create(req.body);
            return res.redirect('/users/signin');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error occured in creating the user ${err}`);
        return;
    }
}

// create session acion
module.exports.createSession = function(req, res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

// destroy session
module.exports.destroySession = function(req,res){
    req.logOut();
    req.flash('success', 'You have logged out');
    return res.redirect('/');
}

module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            let User = await user.findByIdAndUpdate(req.params.id , req.body);
            return res.redirect('back');
        }else{
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        console.log(`Error occured in updating the user details ${err}`);
        return;
    }
}