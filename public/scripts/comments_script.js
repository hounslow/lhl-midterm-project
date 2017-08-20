$(function () {

 $.ajax({
    method: "GET",
    url: `/1/all_comments`
  }).done((comments) => {
    for (comment of comments){
      $("div.container_comments").prepend($(`
        <H6 class = "user_name"> ${comment.name} </H6><br>
        <H8 class = "comments_field"> ${comment.content} </H8>
        `));
      }
    });
});

$.ajax({
  method: "GET",
  url: `/1/resource`
  }).done((resource) => {
    $('div.container1').append($(`
      <div class="card-header">
        ${resource[0].title}
      </div>
      <div class="card-block">
        <p class="card-text"> ${resource[0].description} </p>
      </div>
      <div class="card-footer text">
        <div class="user-comments">
          <span class = "user_name"> ${resource[0].name} </span>
          <span class = "like"> <i class="fa fa-heart-o" aria-hidden="true"></i> <i class="fa fa-heart" aria-hidden="true"></i> 5 </span>
        </div>
      </div>`));
  });


$("form").on("submit", function(event){
  var form = this;
  $.ajax({
    url: "/:resource_id/comments",
    method: "POST"
  }).done(function(){
    form.reset();
    });
  // event.preventDefault();
  });
