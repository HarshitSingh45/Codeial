const Post = require('../models/post');
const Comments = require('../models/comments');

module.exports.createPost = function(req, res){
    console.log('Creating post');
    Post.create({
        content : req.body.content,
        user: req.user._id
    },function(err, post){
        if(err){console.log('error in creating post', err); return}
        return res.redirect('back');
    })
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){console.log(`Error in finding the user ${err}`); return}
        if(post){
            if(req.user.id == post.user){
                post.remove();
                Comments.deleteMany({ post: req.params.id}, function(err){
                    return res.redirect('back');
                });
            }
        }else{
            res.redirect('back');
        }
    })
}