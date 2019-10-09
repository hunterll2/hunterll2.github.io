import "../scss/wiki.scss";
import { DOM } from "./assets/dom";
import { setGuideMenu, setPageTitle } from "./assets/setter";
import { insertPageContent } from "./assets/inserter";
import { setEventsListener } from "./assets/eventsHandler";

// Main State
export const state = {
    guideMenu: {
        game: "",
        mainSection: "",
        subSection: "",
        article: ""
    },

    pageTitle: "",
    
    isIndex: () => state.guideMenu.game ? false : true,
    isGameIndex: () => state.guideMenu.mainSection ? false : true,
    indexFlag: true,
    smallScreen: $("#screenSizeIndicator").is(":visible")
}

function start() {
    setGuideMenu();
    setPageTitle();
    
    insertPageContent();
    
    setEventsListener();

    guideMenuActivate();
}

$(window).on("hashchange load", () => start());

// test
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
if (state.smallScreen) {
    transformToSmallScreen();
}

function transformToSmallScreen() {
    // Show
    $("#asideBtn").removeClass("hidden");

    // Move
    $("#siteTools").prependTo(DOM.main.footer);
    $("#signForm").appendTo(DOM.main.main);

    // Remove
    $(DOM.aside.footer).remove();
    $(DOM.aside.main).find("#articleNav").remove();

    // Disabled
    $(document).tooltip({ disabled: true });
}