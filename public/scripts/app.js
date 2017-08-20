
$(function () {

  $("i.fa.fa-plus.fa-2x").click(function() {
    $("form.container").slideToggle("fast");
    $("input#resource_title").focus();
  });

$("i.fa.fa-search.fa-2x").click(function() {
  $("form.navbar-form").toggle("slow");
    $("input.form-control").focus();
});

  $.ajax({
    method: "GET",
    url: "/get/resources"
  }).done((resources) => {
    for (resource of resources){
      $("div.row.justify-content-around").append($(`
        <article class="col-4 resource-block">
        <div class="card-header">
        ${resource.title}
        </div>
        <div class="card-text">
        ${resource.description}
        </div>
        <div class="card-footer">
        <div class="url-like">
        <span class="url"> ${resource.url}</span>
        <span class="like"> <i class="fa fa-heart-o" aria-hidden="true"></i> <i class="fa fa-heart" aria-hidden="true"></i> 5 </span>
        </div>
        <div class="username-comments">
        <span class="username">By username_1</span>
        <span class="comments"> <i class="fa fa-comments" aria-hidden="true"></i> Comments </span>
        </div>
        </div>
        </article>`));
      }
    });

  $(".nav_bar_logo").click (function() {
    window.location.href = "/";
  })

  $(".user_button").click( function() {
    window.location.href = "/:id/myresources";
  })

$("button.reset_button").click(function() {
  $("main.search_result").empty();
  $("button.reset_button").hide();
  $("form.navbar-form").find('input').val("");
  $("form.navbar-form").toggle();
});

$("form.navbar-form").submit(function (event) {
  $("button.reset_button").show();

    let input = $(this).find('input').val();

    $.ajax({
    method: "POST",
    url: `/search`,
    data: $("form.navbar-form").serialize()
    }).done((resources) => {
      $("main.search_result").prepend($(`<h3 class = "main_header">
        <span class="header_horizontal_line">
        Search Result
        </span>
        </h3>
        <section class="container">
        <div class="row justify-content-around search_result">`));
      for (resource of resources){
      $("div.row.justify-content-around.search_result").prepend($(`
        <article class="col-4 resource-block">
        <div class="card-header">
        ${resource.title}
        </div>
        <div class="card-text">
        ${resource.description}
        </div>
        <div class="card-footer">
        <div class="url-like">
        <span class="url"> ${resource.url}</span>
        <span class="like"> <i class="fa fa-heart-o" aria-hidden="true"></i> <i class="fa fa-heart" aria-hidden="true"></i> 5 </span>
        </div>
        <div class="username-comments">
        <span class="username">By username_1</span>
        <span class="comments"> <i class="fa fa-comments" aria-hidden="true"></i> Comments </span>
        </div>
        </div>
        </article>
        </div>
        </section>`));
      }
    });
   event.preventDefault();
  });


});
