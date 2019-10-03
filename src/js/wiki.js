import "../scss/wiki.scss";
import { DOM } from "./assets/dom";
import loadPage from "./assets/loadPage";
import { games } from "./assets/data";

const state = {
    pageTitle: "",
    pageUrl: "",
    guideMenu: location.pathname.replace("/wiki/", '').replace("/", '')
}

/*
- 
*/

function getArticleTitle(articleUrl) {
    const gameGuide = games[state.guideMenu];

    let search;
    for (let mainSection in gameGuide) {
      // Get all articles in this section
      const mainArticles = gameGuide[mainSection].articles;
      
      // search for the article that contain the same url
      search = mainArticles.find(article => article.url === articleUrl);
      
      // if find it on main, then finsh the fun and return
      if (search) {
        return search.title;
        
        // else continue to search on subsections
      } else {
        for (let subSection in gameGuide[mainSection]) {
          const subArticles = gameGuide[mainSection][subSection].articles;
          
          // just here on subsections may some time get undifend!
          // but on main some time get empty arry!
          if (subArticles) {
            search = subArticles.find(article => article.url === articleUrl);
            if (search) {
              return search.title;
            }
          }
        } // end of sub loop
      }
    } // end of main loop
  }

$(window).on('hashchange load', function(){
    // if page is article
    if (location.hash) {
        const articleUrl = location.hash.replace('#', '');

        // Update state
        state.pageTitle = getArticleTitle(articleUrl);
        state.pageUrl   = location.pathname + 'articles/' + articleUrl + '.html';

        // Load page
        $('h1').text(state.pageTitle);
        $('article').load(state.pageUrl);

        // Load Components

        // showEditTools();
        // showUserTools();
        // showSideGuideMenu();
        // createArticleNav();

    // if not, then it's the main page of cur game
    } else {
        // Update state
        state.pageTitle = `الصفحة الرئيسية للعبة ${state.guideMenu}`;
        state.pageUrl   = location.pathname + 'articles/main.html';

        // Load page
        $('h1').text(state.pageTitle);
        $('article').load(state.pageUrl);

        // Load Components
    }
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

// Global varibles
let smallScreen = $("#screenSizeIndicator").is(":visible");

// init Functions
const init = () => {
    // unactivate
    $(DOM.tools.allTools).children("button").not("#fullScreenBtn").removeClass("activeBtn");
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
    $(DOM.tools.editTools).show();
    $(DOM.main.footer).find("button").not("#fullScreenBtn, #searchBtn").show();
};

/* ==================== Events Handler ==================== */
const btnFunctions = {
    // Site Tools
    showSignForm: () => {
        $("#signForm").removeClass("hidden");
        $(DOM.aside.main).find(".sideNavs").addClass("unactive");
    },
    showSearchNav: () => {
        $("#mainNav").addClass("hiddenToUp");
        $("#searchNav").removeClass("hiddenToUp");
    },
    fullScreen: function () {
        $(this).toggleClass("activeBtn");

        if ($(this).hasClass("activeBtn")) {
            document.documentElement.requestFullscreen();
            $(this).find("i").removeClass("fa-expand").addClass("fa-compress");
            $(this).attr("title", "الخروج من وضع ملئ الشاشة");
        } else {
            document.exitFullscreen();
            $(this).find("i").removeClass("fa-compress").addClass("fa-expand");
            $(this).attr("title", "عرض الموقع بوضع ملئ الشاشة");
        }
    },

    // Edit Tools
    showEditor: () => {
        $("#mainNav").addClass("hiddenToUp");
        $("#editor_edit, #editor_add").removeClass("hiddenToUp");
        $("body").addClass("fullPage");
        $(DOM.main.footer).find("button").hide();
    },
    historyBtn: () => {
        $("#articleHistory").removeClass("hidden").siblings().addClass("hidden");
    },
    deleteBtn: () => {
        $("#alertsBar").removeClass("hiddenToUp");
        // $("#alertsBar").html('<input type="text" class="rtl" placeholder="الرجاء توضيح سبب الحذف">');
        // $("#alertsBar").append('<button>إرسال طلب حذف</button>');
    },

    // article Tools
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
            $(DOM.tools.editTools).hide();
            $(DOM.main.footer).find("button").not("#asideBtn").hide();
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

// Add Event Handler [special Buttons]
const specialBtns = $("#fullScreenBtn, #goUpBtn, #overlay");
$(DOM.tools.siteTools).children("#fullScreenBtn").click(btnFunctions.fullScreen);
$(DOM.tools.artilceTools).children("#goUpBtn").click(btnFunctions.goUp);
$(DOM.tools.controlTools).children("#overlay").click(init);

// Add Event Handler
$(DOM.tools.allTools).children("button").not(specialBtns).click(eventsHandler);

// 
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
    let functions = (smallScreen) ? btnFunctions.smallScreen : btnFunctions;

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


/* ============================================================================
       =================== Phone Module ===================
=============================================================================== */
// Phone Nodule: for screen from 320px to 480px.

/* ==================== Global ==================== */
if (smallScreen) {
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