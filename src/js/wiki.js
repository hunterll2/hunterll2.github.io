import "../scss/wiki.scss";
import { DOM } from "./assets/dom";
import { setState } from "./assets/setter";
import { insertPageContent, insertComponents } from "./assets/inserter";

// Main State
export const state = {
    guideMenu: {
        game: "",
        mainSection: "",
        subSection: "",
        article: ""
    },

    pageTitle: "",

    prevPage: 0,
    curPage: 0,
    
    isIndex: () => state.guideMenu.game ? false : true,
    isGameIndex: () => state.guideMenu.mainSection ? false : true,

    // can't use here a function for unkonwn reason
    isSmallScreen: $("#screenSizeIndicator").is(":visible")
}

function start() {
    console.log('new start')
    
    setState();

    insertPageContent();

    insertComponents();
        
    guideMenuActivate();
}

function update() {
    console.log("restart")
    
    // set the page type before update the state
    state.prevPage = determinePageType(); 
    
    setState();
    
    // set the page type after update the state
    state.curPage = determinePageType();
    console.log(`prev: ${state.prevPage} - cur: ${state.curPage}`);
    
    insertPageContent();

    // To prevent of UPDATING the same component twice,
    // compare between the prevs and cur page type
    if (state.curPage !== state.prevPage) insertComponents();
    
    guideMenuActivate();
}

function determinePageType() {
    /** Determine the page state based on cur state
     * Type 1: Game Index
     * Type 3: Game Index on small screen
     * Type 2: Game Article
     * Type 4: Game Article on small screen
     */

    let pageType;
    
    switch(true) {
        case state.isGameIndex() && !state.isSmallScreen: pageType = 1; break;
        case state.isGameIndex() && state.isSmallScreen: pageType = 3; break;
        case !state.isGameIndex() && !state.isSmallScreen: pageType = 2; break;
        case !state.isGameIndex() && state.isSmallScreen: pageType = 4; break;
    }

    return pageType;
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

$(window).on("load", () => {
    if (!location.hash.startsWith("#_")) start();
});

$(window).on("hashchange", () => {
    if (!location.hash.startsWith("#_")) update();
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