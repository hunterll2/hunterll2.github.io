import { DOM } from "./wiki_dom";

// init Functions
const init_module = {
    sideNavs: () => {
        $("#gameNav, #articleNav").removeClass("active");
        $("#gameNav, #articleNav").removeClass("unactive");
    },

    gameNav: () => {
        $("#gameNav li").show();
        $("#gameNav button").removeClass("activeBtn");
        $("#gameNav button").next("ul").hide();
        $(".navPath").addClass("hiddenToUp");
        $(".mainSection, .subSection").hide().text("");
    }
};

// Active and unactive side nav
$(DOM.aside.main).find("nav h2").click(function (event) {
    let $currentTarget = $(event.currentTarget).parent();

    if ($currentTarget.hasClass("active")) {
        init_module.sideNavs();
        init_module.gameNav();
    } else if ($currentTarget.hasClass("unactive")) {
        init_module.sideNavs();
        $currentTarget.addClass("active").siblings("nav").addClass("unactive");
    } else {
        $currentTarget.addClass("active").siblings("nav").addClass("unactive");
    }
});

/* ============================================================================
            =================== Aside Section ===================
=============================================================================== */
/* ==================== Game Nav ==================== */
// Main Menu
$(DOM.aside.main).find("#gameNav > ul > li > button").click(function (event) {
    let $currentTarget = $(event.currentTarget);
    $currentTarget.toggleClass("activeBtn");
    $currentTarget.next("ul").toggle();
    $currentTarget.parent().siblings().toggle();
    // show main path
    $(".navPath").toggleClass("hiddenToUp");
    $(".mainSection").fadeToggle().text($currentTarget.text());
    // init subtitles menu
    $("#gameNav > ul > li > ul button").removeClass("activeBtn");
    $("#gameNav > ul > li > ul li").show();
    $("#gameNav > ul > li > ul ul").hide();
    $(".subSection").hide().text("");
    // First and Last click
    if ($currentTarget.hasClass("activeBtn")) {
        $("#articleNav").addClass("unactive");
    } else {
        init_module.sideNavs();
    }
});

// Second Menu
$(DOM.aside.main).find("#gameNav > ul > li > ul button").click(function (event) {
    let $currentTarget = $(event.currentTarget);
    $currentTarget.toggleClass("activeBtn");
    $currentTarget.next("ul").toggle();
    $currentTarget.parent().siblings().toggle();
    // show second path
    $(".subSection").fadeToggle().text($currentTarget.text());
});

// Artilces Link
$(DOM.aside.main).find("#gameNav a").click(function (event) {
    const $currentTarget = $(event.currentTarget),
        articleURL = $currentTarget.attr("id"),
        articleName = $currentTarget.text(),
        articleID = $currentTarget.attr("id").substr(8, 1);
    $("#gameNav a").removeClass("activeBtn");
    fetchPage(articleName, "/wiki/bloodborne/articles/" + articleURL + ".html", 16, ["gameWorld", , articleID]);
});