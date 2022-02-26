const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        // the post we creating it needs to be linked to the user(who posted that post)
        // type will refer to the user schema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array of all the comments in post schema
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;