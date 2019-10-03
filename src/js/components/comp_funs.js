import { DOM } from "../assets/dom";
// import { async } from "q";

/* Functions of components
- Active and unactive side nav
- List guide menu
- Grid guide menu
- Fetch pages
- Article nav
*/

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

/* ==================== Active and unactive side nav ==================== */
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
const init = {
    list() {
        $('.list').find('button').removeClass("activeBtn");
        $('.list').find(`.menu__level--1st`).children("li").show();
        $('.list').find(`.menu__level--2nd`).addClass("hidden");
    },

    path() {
        $('.path').find(".main, .sub").hide();
        $(".path").find('.gameName').addClass('disabled');
        $(".path").find('.gameName').attr('title', '');
        $(".path").find('.gameName').tooltip({ disabled: true });


        $(".boxes").children("li").show();
        $(".boxes").find("li").children("button").show();
        $(".boxes").find("li").children("button").removeClass("active");
        $(".boxes").find("li").children("button").next("ul").addClass("hidden");

        $(`.boxes .menu__level--1st`).children("li").show();
    }
}

// Guide Menu
export const guideMenuFun = event => {
    const $curTarget = $(event.currentTarget);
    const $targetMenu = $curTarget.next("ul");
    const $targetSiblings = $curTarget.parent().siblings();
    const $curMenu = $($curTarget.parents(".guideMenu").hasClass("list") ? ".list" : ".boxes");

    /* logic: If the type of next menu to curTarget is "menu first level",
    then the curTarget is "main section btn". */
    const isMainSection = $targetMenu.attr("class").includes("1st");

    // show subsections
    $targetMenu.toggleClass("hidden");

    // hide other BTNs that are at the same level
    if ($curMenu.hasClass('list')) {
        $targetSiblings.toggle();

        // hide cur btn with the other btns IF the menu style is grid
    } else {
        $curTarget.toggle();
        $targetSiblings.toggle();
    }

    // hide other MENUs that are at the same level
    $curMenu.find(`.menu__level--${isMainSection ? "1st" : "2nd"}`).not($targetMenu).addClass("hidden");

    // make the menu path for list style
    if ($curMenu.hasClass('list')) {
        // reset to init state when close main sections
        if ($curTarget.hasClass("activeBtn") && isMainSection) {
            init.list()
        } else {
            // active cur btn
            $curTarget.toggleClass("activeBtn");
        }
    }

    // make the menu path for box style
    if ($curMenu.hasClass('boxes')) {
        const sectionType = isMainSection ? "main" : "sub";
        const sectionName = $curTarget.find("span").text();
        const createPathEl = (section, name) => `
            <button class="${section} disabled" title="">
                <i class="fas fa-folder-open"></i>${name}
            </button>
         `;

        $curTarget.addClass("active");
        $(".path").find(`.${sectionType}`).remove();

        if (sectionType === 'main') {
            $(".path").find('.gameName').removeClass('disabled');
            $(".path").find('.gameName').attr('title', 'الرجوع إلى القائمة الرئيسية');
            $(".path").append(createPathEl(sectionType, sectionName));
        } else {
            $(".path").find('.main').removeClass('disabled');
            $(".path").find('.main').attr('title', 'الرجوع إلى القائمة السابقة');
            $(".path").append(createPathEl(sectionType, sectionName));
        }
    }
}

export const pathFun = event => {
    const $curTarget = $(event.target);

    if ($curTarget.hasClass("gameName")) {
        init.path()

    } else if ($curTarget.hasClass("main")) {
        $('.path').find(".sub").hide();
        $(".path").find('.main').addClass('disabled');
        $(".path").find('.main').tooltip({ disabled: true });

        $(`.boxes .menu__level--1st`).children("li").show();
        $(".boxes .menu__level--1st").find("li").children("button").show();
        $(".boxes .menu__level--2nd").addClass("hidden");
        $(".boxes .menu__level--2nd").prev("button").removeClass("active");
    };
}

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