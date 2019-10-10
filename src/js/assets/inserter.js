import axios from "axios";
import { DOM } from "./dom";
import { state } from "../wiki";
import { createGuideMenu } from "../components/guide_menu";
import * as components from "../components/components";
import { setEventsListener } from "./eventsHandler";
import { setTitlesId } from "../components/articleNav";

export const insertPageContent = () => {
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

        $(DOM.main.main).find('article').html(setTitlesId(page.data));
    }
}

function insertComponents(pageType) {
    if (pageType === "index") {
        insertGuideMenu("index");
        setEventsListener();
        
        state.indexFlag = true;
    } else if (state.indexFlag && pageType === "article") {
        insertEditor();
        insertEditTools();
        insertGuideMenu("side");
        insertArticleNav();
        hideSignForm();
        insertFooter();
        
        // set events listener after added all the components
        setEventsListener();
        
        // here must deal with "flag", to ensure that componts not insrted twice
        state.indexFlag = false;
    }
}

/* Specific functions */
function insertEditor() {
    $(DOM.main.header).find("nav#mainNav").after(components.editor());
}

function insertEditTools() {
    $(DOM.main.header).find("#editTools").prepend(components.editTools());
}

function insertGuideMenu(type) {
    if (type === "index") {
        $(DOM.main.main).find("article").html(components.guideMenu("index"));
    } else {
        $(DOM.aside.main).find(".sideNavs").prepend(components.guideMenu("side"));
    }
    
    createGuideMenu();
}

function insertArticleNav() {
    $(DOM.aside.main).find(".sideNavs").append(components.articleNav);
}

function hideSignForm() {
    $("#signForm").addClass("hidden");
}

function insertFooter() {
    $(DOM.aside.sideSection).append(components.footer());
}