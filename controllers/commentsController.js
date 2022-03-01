const Comment = require('../models/comments');
const Post = require('../models/post');
const { post } = require('../routes/posts');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                // post: post._id or
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        }
    }catch(err){
        console.log(`Error occured in creating the comment ${err}`);
        return;
    }
    
    
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment){
            if(req.user.id == comment.user){
                let postId = comment.post;
                comment.remove();

                Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err,post){
                    return res.redirect('back');
                })
            }
            else{
                return res.redirect('back');
            }
        }
    }catch(err){
        console.log(`Error occured in deleting comment ${err}`);
        return;
    }
      
}