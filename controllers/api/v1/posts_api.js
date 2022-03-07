const Post = require('../../../models/post');
const Comments = require('../../../models/comments');

// this will be like posts controller
module.exports.index = async function(req, res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200, {
        message: 'Lists of posts',
        posts: posts
    })
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post){
            // if(req.user.id == post.user){
                post.remove();
                await Comments.deleteMany({ post: req.params.id});
               
                return res.json(200, {
                    message: 'posts and associated comments deleted successfully'
                })
        //     }
        // }else{
        //     req.flash('error', 'You cannot delete this post');
        //     res.redirect('back');
        }
    }catch(err){
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}