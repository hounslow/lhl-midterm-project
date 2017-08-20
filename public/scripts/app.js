$(function () {

  $("i.fa.fa-plus.fa-2x").click(function() {
    $("form.container").slideToggle("fast");
    $("input#resource_title").focus();
  });

  $("i.fa.fa-search.fa-2x").click(function() {
    $("form.navbar-form").toggle("slow");
    $("input.form-control").focus();
  });

  $.fn.toggle2classes = function(class1, class2){
    if( !class1 || !class2 )
    return this;

    return this.each(function(){
      var $elm = $(this);

      if( $elm.hasClass(class1) || $elm.hasClass(class2) )
      $elm.toggleClass(class1 +' '+ class2);

      else
      $elm.addClass(class1);
    });
  };

  $(document).on("click", "span.like", function() {
    $(this).find("i.fa").toggle2classes('fa-heart', 'fa-heart-o');
  });

  $.ajax({
    method: "GET",
    url: "/get/resources"
  }).done((resources) => {
    for (resource of resources){
      $("div.row.justify-content-around").prepend($(`
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
        <span class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
        </span>
        </div>
        <div class="username-comments">
        <span class="username">By ${resource.name}</span>
        <span class="comments">
        <div class="resource_id_hidden">${resource.id}</div>
        <div class="user_id_hidden">${resource.user_id}</div>
        <i class="fa fa-comments" aria-hidden="true"></i>
        Comments
        </span>
        </div>
        </div>
        </article>`));
      }
    });

    $(document).on('click', 'span.comments', function() {
      const resource_id = $(this).find("div.resource_id_hidden").text();
      window.location.href = `/${resource_id}/comments`;
    });

    $(document).on('click', 'span.url', function() {
      var myUrl = $(this).text();
      myUrl = "http://" + myUrl.trim();
      window.location.href = myUrl;
    });

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
      $(".nav_bar_logo").click (function() {
        window.location.href = "/";
      })

      $("a.nav-item.user_button").click(function() {
        const user_id = $(this).find("div.hidden_user_id").text();
        window.location.href = `/${user_id}/myresources`;
      });
      // $("div.update_user_profile").click(function() {
      //   const user_id = $('a.nav-item.user_button').find("div.hidden_user_id").text();
      //   console.log(user_id);
      //   window.location.href = `/${user_id}/profile`;
      // });
    });
