// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     $("<h3>").text("USERS:").appendTo($("body"));
//     for(user of users) {
//       $("<div>").text(`${user.name} --> ${user.email} --> ${user.password}`).appendTo($("body"));
//     }
//   });
//
//   $.ajax({
//     method: "GET",
//     url: "/api/resources"
//   }).done((resources) => {
//     $("<h3>").text("RESOURCES:").appendTo($("body"));
//     for (resource of resources){
//       console.log(resource.title);
//       $("<div>").text(resource.title + " --> " + resource.url + " --> " + resource.description).appendTo($("body"));
//     }
//   });
//
//   $.ajax({
//     method: "GET",
//     url: "/api/comments"
//   }).done((comments) => {
//     $("<h3>").text("COMMENTS:").appendTo($("body"));
//     for (comment of comments){
//       $("<div>").text(comment.content).appendTo($("body"));
//     }
//   });
//
//   $.ajax({
//     method: "GET",
//     url: "/api/topics"
//   }).done((topics) => {
//     $("<h3>").text("TOPICS:").appendTo($("body"));
//     for (topic of topics){
//       $("<div>").text(topic.name).appendTo($("body"));
//     }
//   });
// });

$(function () {
$("i.fa.fa-plus.fa-2x").click(function() {
  $("form.container").slideToggle("fast");
    $("input#resource_title").focus();
  });
  // });
});
