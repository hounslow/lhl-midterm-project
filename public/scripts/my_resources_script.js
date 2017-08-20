$(function () {

  $("i.fa.fa-plus.fa-2x").click(function() {
    $("form.container").slideToggle("fast");
    $("input#resource_title").focus();
  });

  $("i.fa.fa-search.fa-2x").click(function() {
    $("form.navbar-form").toggle("slow");
    $("input.form-control").focus();
  });

  const user_id = $('div.hidden_user_id').text();

  $.ajax({
    method: "GET",
    url: `/${user_id}/user_resources`
  }).done((resources) => {
    for (resource of resources) {
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
        <span class="like"> <i class="fa fa-heart-o" aria-hidden="true"></i> <i class="fa fa-heart" aria-hidden="true"></i> 5 </span>
        </div>

        <div class="username-comments">
        <span class="username">By ${resource.name}</span>
        <span class="comments">
          <div class="resource_id_hidden">${resource.id}</div>
          <div class="user_id_hidden">${resource.user_id}</div>
          <i class="fa fa-comments" aria-hidden="true"></i> Comments </span>
        </div>
        </div>
        </article>`));
      }
    });

    $(document).on('click', 'span.comments', function() {
      const resource_id = $(this).find("div.resource_id_hidden").text();
      console.log($(this).find("div.resource_id_hidden").text());
      window.location.href = `/${resource_id}/comments`;
    });

    $(document).on('click', 'span.url', function() {
      var myUrl = $(this).text();
      myUrl = "http://" + myUrl.trim();
      window.location.href = myUrl;
    });

    $(".nav_bar_logo_name").click (function() {
      window.location.href = "/";
    });
    
    $("a.nav-item.user_button").click(function() {
      const user_id = $(this).find("div.hidden_user_id").text();
      window.location.href = `/${user_id}/myresources`;
    });
  });
