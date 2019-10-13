export const state = {
    prevPage: 0,
    curPage: 0,
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

async function update() {
    // set the page type before update the state
    state.prevPage = determinePageType(); 
    
    setState();
    
    insertPageTitle();

    if (!state.isGameIndex()) {
        await insertArticle();
    };

    // set the page type after update the state
    state.curPage = determinePageType();

    // To prevent of UPDATING the same component twice,
    // compare between the prevs and cur page type
    if (state.curPage !== state.prevPage) insertComponents();
    if (state.curPage === 2 && state.prevPage === 2) insertComponents();

    guideMenuActivate();
}

function determinePageType() {
    /** Determine the page state based on cur state
     * Type 1: Game Index
     * Type 3: Game Index on small screen
     * Type 2: Game Article [exist]
     * Type 4: Game Article on small screen [exist]
     * Type -2: Game Article [not-exist]
     * Type -4: Game Article on small screen [not-exist]
     */

    let pageType;
    
    switch(true) {
        case state.isGameIndex() && !state.isSmallScreen: pageType = 1; break;
        case state.isGameIndex() && state.isSmallScreen: pageType = 3; break;

        case !state.isGameIndex() && !state.isSmallScreen && state.pageExist: pageType = 2; break;
        case !state.isGameIndex() && state.isSmallScreen && state.pageExist: pageType = 4; break;

        case !state.isGameIndex() && !state.isSmallScreen && !state.pageExist: pageType = -2; break;
        case !state.isGameIndex() && state.isSmallScreen && !state.pageExist: pageType = -4; break;
    }

    return pageType;
}

$(window).on("load", () => {
    if (!location.hash.startsWith("#_")) start();
});

$(window).on("hashchange", () => {
    if (!location.hash.startsWith("#_")) update();
});