const Comment = require('../models/comments');
const Post = require('../models/post');
const { post } = require('../routes/posts');
const commentsMailer = require('../mailers/comments_mailers');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/likes');


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
            comment = await comment.populate('user', 'email');
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){ console.log('error in sending to the queue', err); return}

                console.log('job enqueued ', job.id);
            })
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
                
                await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

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