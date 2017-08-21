$(function () {
  const resource_id = $("div.hidden_resource_id").text();
  $.ajax({
    method: "GET",
    url: `/${resource_id}/all_comments`
  }).done((comments) => {
    for (comment of comments){
      $("div.container_comments").prepend($(`
        <H5 class = "user_name"> ${comment.name}: </H5><br>
        <H8 class = "comments_field"> ${comment.content} </H8>
        `));
      }
    });

  $.ajax({
    method: "GET",
    url: `/${resource_id}/resource`
  }).done((resource) => {
    $('div.container1').prepend($(`
      <div class="card-header">
      ${resource[0].title}
      </div>
      <div class="card-block">
      <p class="card-text"> ${resource[0].description} </p>
      </div>
      <div class="card-footer text">
      <div class="user-comments">
      <span class="url"> ${resource[0].url}</span>
      <span class = "user_name"> ${resource[0].name} </span>
      <span class = "like"></i> <i class="fa fa-heart" aria-hidden="true"></i></span>
      </div>
      </div>`));
    });

    $(".nav_bar_logo_name.d-inline-block.align-top").click (function() {
      window.location.href = "/";
    });

    $("form").on("submit", function(event){
      var form = this;
      $.ajax({
        url: "/:resource_id/comments",
        method: "POST"
      }).done(function(){
        form.reset();
      });
    });
  });
