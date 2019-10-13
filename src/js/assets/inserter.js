import axios from "axios";
import { DOM } from "./dom";
import { state } from "../wiki";
import { createGuideMenu } from "../components/guide_menu";
import * as components from "../components/components";
import { setEventsListener } from "./eventsHandler";
import { setTitlesId, createArticleNav } from "../components/articleNav";

/** Module Functions:
 * Insert Page Title & Content
 * Insert components based on state (page type, screen size)
 */

/** Main Problems:
 * overide of events listner
 * overwrite of components
 */

export const insertPageTitle = () => {
    $(DOM.main.header).find("h1").text(state.pageTitle);
}

export const insertArticle = async () => {
    try {
        const page = await axios(`./articles/${state.guideMenu.article}.html`); // must url (in browser) end by / !
        $(DOM.main.main).find('article').html(setTitlesId(page.data));

        state.pageExist = true;
    } catch(error) {
        const page = await axios(`./error404.html`);
        $(DOM.main.main).find('article').html(page.data);

        state.pageExist = false;
    }
}

export const insertComponents = () => {
    // First remove all components to prevents add the same component twice
    removeAllTools();
    removeAllComponents();

    // Index components strucuture
    if (state.isGameIndex()) {
        insertEditTools("add");
        insertGuideMenu("main");

        if (!state.isSmallScreen) {
            insertSignForm("aside", "visible");
            insertSiteTools("aside");
        } else {
            insertSignForm("main", "unvisible");
            insertSiteTools("main");
        }

    // Article components strucuture
    } else {
        insertEditor();
        (state.pageExist) ? insertEditTools("edit") : insertEditTools("add");
        if (state.pageExist) insertArticleTools();

        if (!state.isSmallScreen) {
            (state.pageExist) ? insertGuideMenu("aside", "unactive") : insertGuideMenu("aside", "active");
            insertSignForm("aside", "unvisible");
            if (state.pageExist) insertArticleNav();
            insertSiteTools("aside");
        } else {
            insertGuideMenu("aside", "active");
            insertSignForm("main", "unvisible");
            insertSiteTools("main");
        }
    }

    // Set events listener after added all the components
    setEventsListener();
}

/* Specific functions */
const removeAllTools = () => {
    $(DOM.tools.allTools).not(DOM.tools.controlTools).remove();
}

const removeAllComponents = () => {
    $(DOM.components.allComponents).remove();
}

function insertEditor() {
    $(DOM.main.header).find("#mainNav").after(components.editor());
}

function insertEditTools(type) {
    $(DOM.main.header).find("#titleBar").append(components.editTools(type));
}

function insertArticleTools() {
    $(DOM.main.footer).append(components.articleTools());
}

function insertGuideMenu(position, elState) {
    if (position === "aside") {
        $(DOM.aside.main).find(".sideNavs").prepend(components.guideMenu("side", elState));
    } else {
        $(DOM.main.main).find("article").append(components.guideMenu("index"));
    }
    
    createGuideMenu();
}

function insertArticleNav() {
    $(DOM.aside.main).find(".sideNavs").append(components.articleNav);

    createArticleNav();
}

function insertSignForm(position, elState) {
    if (position === "aside") {
        $(DOM.aside.main).append(components.signForm(elState));
    } else {
        $(DOM.main.main).append(components.signForm(elState));
    }
}

function insertSiteTools(position) {
    if (position === "aside") {
        $(DOM.aside.footer).append(components.siteTools());
        
        if (state.isGameIndex()) $("#signFormBtn").addClass("activeBtn"); // FOR NOW
    } else {
        $(DOM.main.footer).prepend(components.siteTools("phone"));
    }
}