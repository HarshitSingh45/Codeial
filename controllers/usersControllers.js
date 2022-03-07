const user = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.user = async function(req,res){
    try{
        let User = await user.findById(req.params.id);
        return res.render('users', {
            title: 'user page',
            profile_user: User
        });
    }catch(err){
        req.flash('error','Error occured in finding the user profile');
        return res.redirect('back');
    }    
}

// Signup action
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        req.flash('success',"Don't need to sign up, You're already logged in");
        return res.redirect('/users/profile');
    }
    req.flash('success','Enter details to sign up');
    return res.render('signup', {
        title: 'Codeial | Signup'
    })
}

// signin action
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        req.flash('success',"Don't need to sign in, You're already logged in");
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
        if(req.body.password != req.body.Cpassword ){
            req.flash('error', 'Invalid details entered');
            return res.redirect('back');
        }

        let User = await user.findOne({email: req.body.email});
        if(!User){
            let USER = await user.create(req.body);
            req.flash('success','Account created successfully');
            return res.redirect('/users/signin');
        }else{
            req.flash('error','User already exists');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','Error occured in creating the user');
        return res.redirect('back');
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
            let User = await user.findById(req.params.id);
            user.uploadedAvatar(req, res, function(err){
                if(err){ console.log('******* multer error ', err)}

                console.log(req.file);
                User.name = req.body.name;
                User.email = req.body.email;

                if(req.file){
                    if(User.avatar){
                        // for deleting we need fs and path 
                        fs.unlinkSync(path.join(__dirname, '..', User.avatar));
                    }
                    // this is saving the of the uploaded file into the avatar field in the user
                    User.avatar = user.avatarPath + '/' +req.file.filename
                }
                User.save();
                return res.redirect('back');
            })
        }else{
            req.flash('error','Alert ! Unauthorized users');
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        req.flash('error','Error occured in updating the user details');
        return res.redirect('back');
    }
}