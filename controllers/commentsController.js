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
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment,
                    },
                    message: 'Comment Created'
                })
            }
            req.flash('success', 'Commented successfully on post')
            res.redirect('/');
        }
    }catch(err){
        req.flash('error','Error occured in creating the comment');
        return res.redirect('/');
    }
    
    
}


module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment){
            if(req.user.id == comment.user){
                let postId = comment.post;
                comment.remove();

                // Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err,post){
                //     req.flash('success', 'Comment deleted successfully');
                //     return res.redirect('back');
                // })
                let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            commentId: req.params.id
                        },
                        message: 'comment deleted'
                    })
                }
                req.flash('success', 'Comment deleted successfully');
                return res.redirect('back');
            }
            else{
                return res.redirect('back');
            }
        }
    }catch(err){
        req.flash('error','Error occured in deleting the post');
        return res.redirect('back');
    }
      
}