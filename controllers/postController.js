const Post = require('../models/post');
const Comments = require('../models/comments');

module.exports.createPost = async function(req, res){
    try{
        console.log('Creating post');
        let post = await Post.create({
            content : req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log('error in creating post', err); 
        return;
    }   
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
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
    }catch(err){
        console.log(`Error in deleting the post ${err}`);
        return;
    }
    
}