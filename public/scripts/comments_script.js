$(function () {

 $.ajax({
    method: "GET",
    url: "/:resource_id/comments"
  }).done((comments) => {
    for (comments of comments){
      $("section.container_comments").append($(`
        <H6 class = "user_name"> By Username_1 </H6><br>
        <H8 class = "comments_field"> ${comments.content} </H8>
        `));
      }
    });

// $("form").on("submit", function(event){
//   var form = this;

//   $.ajax({
//     url: "/:resource_id/comments",
//     method: "post"
//     data: $(form).serialize()
//   }).done(function(){
//     form.reset();
//     loadComments();
//     });
//   event.preventDefault();
//   });
});
