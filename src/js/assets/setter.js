import { state } from "../wiki";
import { games } from "../assets/data";

export const setState = () => {
    // 1st set the guide menu
    setGuideMenu();

    // then based on that set the page title
    setPageTitle();
}

const setGuideMenu = () => {
    // Set Game Name
    for (let game of getGamesList()) {
        if (location.pathname.includes(game))
            state.guideMenu.game = game;
    }

    // Set Main Section
    state.guideMenu.mainSection = getSection()[0];

    // Set Subsection
    state.guideMenu.subSection = getSection()[1];

    // Set Article
    state.guideMenu.article = getArticleName();
}

const setPageTitle = () => {
    /* Set Page Title based on Guide Menu */
    
    // if its index -> set a static title
    if (state.isIndex()) {
        state.pageTitle = "الصفحة الرئيسية لموسوعة الألعاب";

    // else check if it's game index, then set title based on game name
    } else if (state.isGameIndex()) {
        state.pageTitle = "الصفحة الرئيسية للعبة " + state.guideMenu.game;

    // else then it's article page, set title based on that
    } else {
        state.pageTitle = getArticleTitle();
    }
}

/* Private Functions */
function getGamesList() {
    return Object.keys(games);
}

function getGameArticles(game = state.guideMenu.game) {
    const allAriclesAryy = [];
    let ariclesAryy;

    game = games[game]; // get game object from games object
    for (let mainSection in game) {

        // Get Main Sections
        ariclesAryy = game[mainSection].articles;
        ariclesAryy.forEach(article => allAriclesAryy.push(article.url));

        // Get Subsectinos
        for (let subSection in game[mainSection]) {
            ariclesAryy = game[mainSection][subSection].articles;

            // we must exclude [name, img, articles] from filter
            // because they in the same level with subsections
            if (subSection !== "name" && subSection !== "img" && subSection !== "articles")
                ariclesAryy.forEach(article => allAriclesAryy.push(article.url));
        }
    }

    return allAriclesAryy;
}

function getArticleName() {
    const getHashName = location.hash.substr(1);

    for (let article of getGameArticles()) {
        if (getHashName === article)
            return article;
    }
}

function getArticleTitle(game = state.guideMenu.game) {
    let ariclesAryy, articleName = getArticleName(), articleTitle;
    
    game = games[game]; // get game object from games object
    for (let mainSection in game) {

        // Get Main Sections
        ariclesAryy = game[mainSection].articles;
        ariclesAryy.forEach(article => {
            if (articleName === article.url) articleTitle = article.title;
        });

        // Get Subsectinos
        for (let subSection in game[mainSection]) {
            ariclesAryy = game[mainSection][subSection].articles;

            // we must exclude [name, img, articles] from filter
            // because they in the same level with subsections
            if (subSection !== "name" && subSection !== "img" && subSection !== "articles") {
                ariclesAryy.forEach(article => {
                    if (articleName === article.url) articleTitle = article.title;
                });
            }
        }
    }

    return articleTitle;
}

function getSection(game = state.guideMenu.game) {
    /*
    * Find the direct parent section for given article.
    * The logic is: if you find the article inside the section,
        then get that section name.
    * If that section is branching from another section,
        then find it's direct parent section
    * Finally check of some conditions to assign defualt values or not
    * This fnction return array of values: [man_section, sub_section]
    */

    let sectionName, subSectionName, articleName = getArticleName();

    game = games[game]; // get game object from games object

    for (let mainSection in game) {
        // 1st search inside main sections
        for (let article of game[mainSection].articles) {
            if (article.url === articleName) sectionName = mainSection;
        }

        // If "sectionName" is assigned, no need to more search
        if (sectionName) break;

        // ... if not, then search inside subsections
        for (let subSection in game[mainSection]) {
            // we must exclude [name, img, articles] from filter
            // because they in the same level with subsections
            if (
                subSection === "articles" ||
                subSection === "name" ||
                subSection === "img"
            ) continue;

            for (let article of game[mainSection][subSection].articles) {
                if (article.url === articleName) subSectionName = subSection;
            }
        }
    }

    /* Final step, get value and assign defualt values */
    // if both the MAIN and SUB are not defiend, then return defualt value
    if (!sectionName && !subSectionName) return ["", ""];

    // if just SUB not defiend, then assign defualt val to it
    if (!subSectionName) return [sectionName, ""];

    // if both the MAIN and SUB are defiend, then get it parent section of SUB
    for (let mainkey in game) {
        for (let subkey in game[mainkey]) {
            if (subkey === subSectionName) sectionName = mainkey;
        }
    }
    return [sectionName, subSectionName];
}