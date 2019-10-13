import "../scss/wiki.scss";
import { DOM } from "./assets/dom";
import { setState } from "./assets/setter";
import { insertPageTitle, insertArticle, insertComponents } from "./assets/inserter";

// Main State
export const state = {
    guideMenu: {
        game: "",
        mainSection: "",
        subSection: "",
        article: "",
    },
    
    pageExist: false,
    pageTitle: "",
    
    isIndex: () => state.guideMenu.game ? false : true,
    isGameIndex: () => state.guideMenu.mainSection ? false : true,

    // can't use here a function for unkonwn reason
    isSmallScreen: $("#screenSizeIndicator").is(":visible")
}

async function start() {
    setState();

    insertPageTitle();
    
    if (!state.isGameIndex()) {
        await insertArticle();
    };

    insertComponents();
        
    guideMenuActivate();
}

function guideMenuActivate() {
    // activate elemnts of SIDE guide menu based on cur state
    // problem 1: if state not defined, elements disapppear

    // Activate article name
    $(".guideMenu").find("a").removeClass("activeBtn");
    $(".guideMenu").find(`a[href="#${state.guideMenu.article}"]`).addClass("activeBtn");

    // Activate Main Section
    const mainSectionName = state.guideMenu.mainSection;
    $(".menu__level--1st").parent().not(`#${mainSectionName}`).hide();
    $(`li#${mainSectionName}`).children("ul").removeClass("hidden");
    $(`li#${mainSectionName}`).children("button").addClass("activeBtn");

    // Activate subsction
    const subSectionName = state.guideMenu.subSection;
    if (subSectionName) {
        $(`li#${mainSectionName}`).children("ul").children("li").not(`li#${subSectionName}`).hide();
        $(`li#${subSectionName}`).children("button").addClass("activeBtn");
        $(`li#${subSectionName}`).children("ul").removeClass("hidden");
    }
}

$(window).on("load hashchange", () => {
    if (!location.hash.startsWith("#_") && !location.href.endsWith("#"))
        start();
});

window.addEventListener("load",function() {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});

/* ============================================================================
       =================== PC Module ===================
=============================================================================== */
// PC Nodule: for screen from 640px and up.

/* ==================== Global ==================== */
// ToolTip
$(document).tooltip({
    position: {
        my: "center bottom",
        at: "center top-5px"
    },
    show: false,
    hide: false
});

// Forms
$("input, textarea").focusin((event) => {
    $(event.currentTarget).prev("label").addClass("activeBtn");
});

$("input, textarea").focusout((event) => {
    $(event.currentTarget).prev("label").removeClass("activeBtn");
});

/* ============================================================================
       =================== Phone Module ===================
=============================================================================== */
// Phone Nodule: for screen from 320px to 480px.

/* ==================== Global ==================== */
if (state.isSmallScreen) {
    transformToSmallScreen();
}

function transformToSmallScreen() {
    // Hide
    $(DOM.aside.footer).hide();

    // Disabled
    $(document).tooltip({ disabled: true });
}