const Post = require('../models/post');
const Comments = require('../models/comments');

module.exports.createPost = async function(req, res){
    try{
        // console.log('Creating post');
        await Post.create({
            content : req.body.content,
            user: req.user._id
        });
        req.flash('success','Post published successfully !! ');
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }   
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post){
            if(req.user.id == post.user){
                post.remove();
                await Comments.deleteMany({ post: req.params.id});
                req.flash('success', 'Post and associated comments deleted');
                return res.redirect('back');
            }
        }else{
            req.flash('error', 'You cannot delete this post');
            res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}
