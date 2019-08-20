import "../scss/home.scss";

function init() {
    $("#siteNav button").removeClass("activeBtn");
    $("section").addClass("hide");
   }

   $("#siteNav button").click(function(event) {
    var btnID = "#" + $(event.currentTarget).attr("id");
    var sectionID = btnID.replace("Btn", "");

    if (!$(btnID).hasClass('activeBtn')) {
     init()
     $(btnID).addClass("activeBtn");
     $(sectionID).removeClass("hide");
    } else {
     $(btnID).removeClass("activeBtn");
     $(sectionID).addClass("hide");
    }

   });

   $("#searchBox").focus(function() {
    init();
    $("header, nav").slideToggle()
   });

   $("#searchBox").focusout(function() {
    $("header, nav").slideToggle()
});