{
    let createComment = function(){
        let createCommentForm = $('#post-comments-form');
        createCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: createCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDOM(data.data.comment);
                    $('.post-comments-list>ul').prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    let newCommentDOM = function(comment){
        return $(`<li id="comment-${comment._id}">
                    <p>${comment.content}</p>
                    <small>${comment.user.name}</small>
                        <a class="delete-comment-button" href="/comments/destroy/${comment._id}">
                            <button type="submit">Delete Comment</button>
                        </a>
                </li>`);
    }
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#comment-${data.data.commentId}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createComment();
}