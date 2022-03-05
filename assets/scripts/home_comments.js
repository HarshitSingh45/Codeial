{
    let createComment = function(){
        let cmmntForm = $('#new-comment-form');
        cmmntForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: 'comments/create',
                data: cmmntForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDOM(data.data);
                    $(`.post-comments-list>ul`).prepend(newComment);
                    deleteComment($(' .delete-comment',newComment));

                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    newCommentDOM = function(data){
        console.log(data);
        return $(`<li>
                    <p>${data.comment.content}></p>
                    <small><${data.comment.user.name} ></small>
                        <a class="delete-comment" href="/comments/destroy/${data.comment.id}">
                            <button type="submit">Delete Comment</button>
                        </a>
                </li>`)
    }
    createComment();
}