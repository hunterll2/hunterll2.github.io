import { DOM } from "./wiki_dom";
import { async } from "q";

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
function firstMenu(event, isHash) {
    let $currentTarget = isHash === true ? event : $(event.currentTarget);
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
}

function secondMenu(event, isHash) {
    let $currentTarget = isHash === true ? event : $(event.currentTarget);
    $currentTarget.toggleClass("activeBtn");
    $currentTarget.next("ul").toggle();
    $currentTarget.parent().siblings().toggle();
    // show second path
    $(".subSection").fadeToggle().text($currentTarget.text());
}

// First Menu
$(DOM.aside.main).find("#gameNav > ul > li > button").click(firstMenu);

// Second Menu
$(DOM.aside.main).find("#gameNav > ul > li > ul button").click(secondMenu);


/* Fetch Pages */
['hashchange', 'load'].forEach(e => window.addEventListener(e, () => {
    if (window.location.hash) {
        const $El = $(`#gameNav a[href="${window.location.hash}"]`);

        // Game Guide Menu
        if (e === 'load') {
            const $El_1st = $El.parents('.menu__1stLevel').attr('id');
            const $El_2nd = $El.parents('.menu__2ndLevel').attr('id');
            let $El_btn;
            if ($El.parents('.menu__2ndLevel')) {
                $El_btn = $(`#${$El_1st}`).children('button');
                firstMenu($El_btn, true);
                
                $El_btn = $(`#${$El_2nd}`).children('button');
                secondMenu($El_btn, true);
            } else {
                $El_btn = $(`#${$El_1st}`).children('button');
                firstMenu($El_btn, true);
            }
        }
        
        // active cur article
        $("#gameNav a").removeClass("activeBtn");
        $El.addClass('activeBtn');

        const articleName = $El.text();
        const articleURL = "/wiki/bloodborne/articles/" + window.location.hash.replace('#', '') + ".html";

        fetchPage(articleName, articleURL, 16);
    }
}));

function fetchPage(title, url, commentsCount) {
    $("#titleBar").find("h1").text(title);
    $("#commentsCount").text(commentsCount);

    $("body > main").find("article").load(url, (response, status, xhr) => {
        if (status == 'error') {
            alert('error');
        }
    });
}

$("article").click(e => {
    if (e.target.matches("h2")) {
        console.log('yes')
    }
});