const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');


module.exports.createSession = async function(req, res){
    // whenever a username password is received , we need to find the user and generate the json webtoken corresponding to that user
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: 'Ivalid username or password'
            });
        }
        return res.json(200, {
            message: 'Signedin successfully, here is your token keep it safe bitch !!',
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret , {expiresIn: '100000'})
            }
        })
    }catch(err){
        console.log(`********** ${err}`);
        return res.json(500,{
            message: 'Internal server error'
        });
    }

}