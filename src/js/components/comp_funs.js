import { DOM } from "../assets/dom";

/* Functions of components
- Active and unactive side nav
- List guide menu
- Grid guide menu
- Fetch pages (maybe delete)
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
export const sideNavsFun = event => {
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
}

// $(DOM.aside.main).find(".sideNavs").click(function (event) {
// });

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