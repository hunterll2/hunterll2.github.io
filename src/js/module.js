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
    const $curTarget = $(event.currentTarget).parent();

    if ($curTarget.hasClass("active")) {
        init_module.sideNavs();
        init_module.gameNav();
    } else if ($curTarget.hasClass("unactive")) {
        init_module.sideNavs();
        $curTarget.addClass("active").siblings("nav").addClass("unactive");
    } else {
        $curTarget.addClass("active").siblings("nav").addClass("unactive");
    }
});

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
        location.assign('/wiki/bloodborne/')
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


$(DOM.aside.main).find('button').click((event) => {
    if ($(event.currentTarget).parent().attr('class') === 'menu__1st') {
        firstMenu(event, false)
    } else {
        secondMenu(event, false)
    }
})

/* ==================== Fetch Pages ==================== */
function fetchPage() {
    if (location.hash && !location.hash.startsWith('#_')) {
        const $El = $(`#gameNav a[href="${window.location.hash}"]`);

        // active cur article
        $("#gameNav a").removeClass("activeBtn");
        $El.addClass('activeBtn');

        // fetch page and set data
        const articleName = $El.text();
        const articleURL = "/wiki/bloodborne/articles/" + window.location.hash.replace('#', '') + ".html";
        const commentsCount = 16;

        $("#titleBar").find("h1").text(articleName);
        $("#commentsCount").text(commentsCount);
        $("body > main").find("article").load(articleURL, (response, status, xhr) => {
            if (status == 'error') {
                alert('error');
            } else {
                // update article nav
                const elements = Array.from($('article h2'));

                $('#articleNav').removeClass('hidden');
                $('#articleNav > ul').empty();
                elements.forEach((el, i) => {
                const hash = $(elements[i]).attr('id');
                const title = $(elements[i]).text();
                $('#articleNav > ul').append(`<li><a href="#${hash}">${title}</a></li>`);
                });
            }
        });

        
    }
}

window.addEventListener('hashchange', fetchPage);

window.addEventListener('load', () => {
    if (location.hash && !location.hash.startsWith('#_')) {
        fetchPage()
        
        const $El = $(`#gameNav a[href="${window.location.hash}"]`);
        
        // Game Guide Menu
        const $El_1st = $El.parents('.menu__1st').attr('id');
        const $El_2nd = $El.parents('.menu__2nd').attr('id');
        
        let $El_btn;
        if ($El.parents('.menu__2nd')) {
            $El_btn = $(`#${$El_1st}`).children('button');
            firstMenu($El_btn, true);
            
            $El_btn = $(`#${$El_2nd}`).children('button');
            secondMenu($El_btn, true);
        } else {
            $El_btn = $(`#${$El_1st}`).children('button');
            firstMenu($El_btn, true);
        }
    };
});