import axios from "axios";
import { DOM } from "./dom";
import { state } from "../wiki";
import { createGuideMenu } from "../components/guide_menu";
import * as components from "../components/components";
import { setEventsListener } from "./eventsHandler";
import { setTitlesId } from "../components/articleNav";

/** Module Functions:
 * Insert Page Title & Content
 * Insert components based on state (page type, screen size)
 */

/** Main Problems:
 * overide of events listner
 * overwrite of components
 */

export const insertPageContent = () => {
    insertPageTitle();
    insertArticle();
}

const insertPageTitle = () => {
    $(DOM.main.header).find("h1").text(state.pageTitle);
}

const insertArticle = async () => {
        const page = await axios(`./articles/${state.guideMenu.article}.html`); // must url (in browser) end by / !
        $(DOM.main.main).find('article').html(setTitlesId(page.data));
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
        insertEditTools("edit");
        insertArticleTools();

        if (!state.isSmallScreen) {
            insertGuideMenu("aside", "unactive");
            insertSignForm("aside", "unvisible");
            insertArticleNav();
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

const removeAllTools = () => {
    $(DOM.tools.allTools).not(DOM.tools.controlTools).remove();
}

const removeAllComponents = () => {
    $(DOM.components.allComponents).remove();
}

/* Specific functions */
function insertEditor() {
    $(DOM.main.header).find("#mainNav").after(components.editor());
}

function insertEditTools(type) {
    $(DOM.main.header).find("#titleBar").append(components.editTools(type));
}

function insertArticleTools() {
    $(DOM.main.footer).append(components.articleTools);
}

function insertGuideMenu(position, state) {
    if (position === "aside") {
        $(DOM.aside.main).find(".sideNavs").prepend(components.guideMenu("side", state));
    } else {
        $(DOM.main.main).find("article").append(components.guideMenu("index"));
    }
    
    createGuideMenu();
}

function insertArticleNav() {
    $(DOM.aside.main).find(".sideNavs").append(components.articleNav);
}

function insertSignForm(position, state) {
    if (position === "aside") {
        $(DOM.aside.main).append(components.signForm(state));
    } else {
        $(DOM.main.main).append(components.signForm(state));
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