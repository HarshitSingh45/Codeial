const User = require('../models/users');
const Friendship = require('../models/friendship');

module.exports.addFriend = async function(req, res){
    let fship = await Friendship.findOne({from_user: req.user.id, to_user: req.params.id});
    if(fship){
        console.log('already both are friends');
        return res.redirect('back');
    }
    fship = await Friendship.findOne({from_user: req.params.id, to_user: req.user.id});
    if(fship){
        console.log('already both are friends');
        return res.redirect('back');
    }
    Friendship.create({
        from_user: req.user.id,
        to_user: req.params.id
    });
    // todo add friends in user model
    console.log("Friendship added");
    return res.redirect('back');

}