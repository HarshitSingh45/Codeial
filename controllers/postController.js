const Post = require('../models/post');
const Comments = require('../models/comments');
const Like = require('../models/likes');

module.exports.createPost = async function(req, res){
    try{
        // console.log('Creating post');
        let post = await Post.create({
            content : req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            // we return json with status
            return res.status(200).json({
                data: {
                    post: post,
                },
                message: 'Post Created'
            })
        }

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

                await Like.deleteMany({likeable: post, onModel: 'Post'});
                await Like.deleteMany({_id: {$in: post.comments}});



                post.remove();
                await Comments.deleteMany({ post: req.params.id});
                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: 'Post deleted'
                    })
                }
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
