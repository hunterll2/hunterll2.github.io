import { DOM } from "./dom";
import { state } from "../wiki";
import { sideNavsFun, guideMenuFun, pathFun } from "../components/comp_funs";

// init Functions
const init = () => {
    // unactivate
    $(DOM.tools.allTools).children("button").removeClass("activeBtn");
    $(".sideNavs").removeClass("unactive");

    // slide Up
    $("#searchNav, #editor_add, #editor_edit, #alertsBar").addClass("hiddenToUp");

    // hide
    $("#signForm").addClass("hidden");

    // slide Down
    $("#mainNav, #titleBar").removeClass("hiddenToUp");

    // show
    $("article").removeClass("hidden").siblings().addClass("hidden");

    // Update Dimensitons
    $("body").removeClass("fullPage");

    // Small Screen
    $("body").removeClass("showAside");
    $("#overlay").hide();
    $(DOM.main.header).removeClass("unactive");
    $(DOM.main.footer).show();

    // inti from read mode function
    $(DOM.main.footer).find("button").not("#searchBtn").show();
};

const btnFunctions = {
    // Site Tools
    showSignForm: () => {
        $("#signForm").removeClass("hidden");
        $(DOM.aside.main).find(".sideNavs").addClass("unactive");
    },

    showSearchNav: () => {
        $("#mainNav").addClass("hiddenToUp");
        $("#searchNav").removeClass("hiddenToUp");
        $("#searchNav").children("input").focus();
    },

    // Edit Tools
    showEditor: () => {
        $("#mainNav").addClass("hiddenToUp");
        $("#editor_edit, #editor_add").removeClass("hiddenToUp");
        $("body").addClass("fullPage");
        $(DOM.main.footer).hide();
    },

    historyBtn: () => {
        $("#articleHistory").removeClass("hidden").siblings().addClass("hidden");
    },

    deleteBtn: () => {
        $("#alertsBar").removeClass("hiddenToUp");
    },

    // Article Tools
    showComments: () => {
        $("#articleComments").removeClass("hidden").siblings().addClass("hidden");
        btnFunctions.goUp();
    },

    goUp: () => {
        $(DOM.main.main).scrollTop(0);
    },
    
    readMode: () => {
        $("#mainNav").addClass("hiddenToUp");
        $("body").addClass("fullPage");
    },

    // Buttons functions for small screen
    smallScreen: {
        showAside: () => {
            $("body").addClass("showAside");
            $("#overlay").show();
            
            btnFunctions.showSearchNav();
            $(DOM.main.header).addClass("unactive");
            $(DOM.main.footer).hide();
        },
        showSignForm: () => {
            $("#signForm").removeClass("hidden").siblings().addClass("hidden");
        },
        readMode: () => {
            $("#titleBar, #mainNav").addClass("hiddenToUp");
            $(DOM.main.footer).find("button").not("#fullPageBtn").hide();
        }
    }
};

// Handler
function eventsHandler(event) {
    let $Target = $(event.currentTarget),
        ID = $Target.attr("id");

    // if cur btn is active -> exit and init
    if ($Target.hasClass("activeBtn")) {
        return init();

        // if ANY btn are active -> init
    } else if ($("button").hasClass("activeBtn")) {
        init();
    }

    // First active cur btn
    $Target.addClass("activeBtn");

    // Do Button function
    // 1. determine functions base
    let functions = (state.isSmallScreen) ? btnFunctions.smallScreen : btnFunctions;

    // 2. determine function action
    if (ID === "asideBtn") functions.showAside();

    if (ID === "signFormBtn") functions.showSignForm();
    if (ID === "fullPageBtn") functions.readMode();

    if (ID === "editBtn") btnFunctions.showEditor();
    if (ID === "searchBtn") btnFunctions.showSearchNav();
    if (ID === "historyBtn") btnFunctions.historyBtn();
    if (ID === "deleteBtn") btnFunctions.deleteBtn();
    if (ID === "commentsBtn") btnFunctions.showComments();
};

export const setEventsListener = () => {
    // Add Event Handler [special Buttons]
    $('.sideNavs').find("h2").click(sideNavsFun);
    $('.guideMenu').find('button').click(guideMenuFun);
    $('.path').click(pathFun);

    const specialBtns = $("#goUpBtn, #overlay");
    $(DOM.tools.articleTools).children("#goUpBtn").click(btnFunctions.goUp);
    $(DOM.tools.controlTools).children("#overlay").click(init);

    // Add Event Handler
    $(DOM.tools.allTools).children("button").not(specialBtns).click(eventsHandler);
}