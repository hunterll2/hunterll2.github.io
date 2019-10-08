import axios from "axios";
import { DOM } from "./dom";
import { state } from "../wiki";
import { createGuideMenu } from "../components/guide_menu";
import { guideMenuFun } from "../components/comp_funs";
import { pathFun } from "../components/comp_funs";
import * as components from "../components/components";

export const insertPageContent = async () => {
    insertPageTitle();

    if (state.isGameIndex()) {
        insertComponents("index");
    } else {
        insertArticle();
        insertComponents("article");
    }
}

const insertPageTitle = () => {
    $(DOM.main.header).find("h1").text(state.pageTitle);
}

const insertArticle = async () => {
    if (!state.isGameIndex()) {
        const page = await axios(`./articles/${state.guideMenu.article}.html`); // must url (in browser) end by / !
        $(DOM.main.main).find('article').html(page.data);
    }
}

function insertComponents(pageType) {
    
    if (pageType === "index") {
        insertGuideMenu("index");
        
        state.indexFlag = true;
    } else if (state.indexFlag && pageType === "article") {
        insertGuideMenu("side");
        insertEditTools();
        hideSignForm();
        insertFooter();
        
        // here must deal with "flag", to ensure that componts not insrted twice
        state.indexFlag = false;
    }
    
    setEventsListener();
}

function setEventsListener() {
    $('.guideMenu').find('button').click(guideMenuFun);
    $('.path').click(pathFun);
}

/*  */
function insertGuideMenu(type) {
    if (type === "index") {
        $(DOM.main.main).find("article").html(components.guideMenu("index"));
    } else {
        $(DOM.aside.main).prepend(components.guideMenu("side"));
    }
    
    createGuideMenu();
}

function hideSignForm() {
    $("#signForm").addClass("hidden");
}

function insertEditTools() {
    $(DOM.main.header).find("#editTools").prepend(components.editTools());
}

function insertFooter() {
    $(DOM.aside.sideSection).append(components.footer());
}