{
    // method to submit form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            // submit form using ajax
            $.ajax({
                type: 'post',
                url: '/posts/create',
                // sending data
                data: newPostForm.serialize(), // this converts the form data into json
                // data: JSON.stringify(newPostForm),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    new ToggleLike($(' .toggle-like-button'), newPost);

                },
                error: function(error){
                    console.log(error.responseText);
                }
            })

        })
    }

    // method to create post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id}">
                        <div>
                            ${ post.content }
                            <small>
                                ${ post.user.name }
                            </small>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                        
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">
                                    <button type="submit"> Delete Post </button>
                                </a>
                        
                            
                        </div>
                        <a class="toggle-like-button" data-likes = "0"  href = "/likes/togggle/?id=${post._id}"&type="Post">
                           0 Likes
                        </a> 
                        <div class="post-commets">

                                <form action="comments/create" method="post">
                                    <input type="text" name="content" placeholder="type here to add comment">
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="ADD COMMENT">
                                </form>
                                
                        </div>
                        <div class="post=comments=list " style="border: 1px solid coral;">
                            <h3>comments</h3>
                            <ul id="post-comments-${post._id}">
                               
                            </ul>
                        </div>
                    </li>`)
    }
    // method to delete post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove()
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}