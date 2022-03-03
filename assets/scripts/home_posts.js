
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
                success: function(data){
                    console.log(data);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })

        })
    }
    // method to create post in DOM
    
    createPost();
}