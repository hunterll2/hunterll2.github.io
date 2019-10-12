/*
    - Get DOM element from UI
*/

export const DOM = {
    main: {
        header: "body > main > header",
        main: "body > main > main",
        footer: "body > main > footer",
        mainSection: "body > main"
    },
    aside: {
        header: "body > aside > header",
        main: "body > aside > main",
        footer: "body > aside > footer",
        sideSection: "body > aside"
    },
    tools: {
        siteTools: "#siteTools",
        editTools: "#editTools",
        articleTools: "#articleTools",
        controlTools: "#controlTools",
        
        allTools: "#siteTools, #editTools, #articleTools, #controlTools"
    },
    components: {
        editor_add: "#editor_add",
        editor_edit: "#editor_edit",
        // editTools: "#editTools",
        // articleTools: "#articleTools",
        gameNav: "#gameNav",
        articleNav: "#articleNav",
        signForm: "#signForm",
        // siteTools: "#siteTools",

        allComponents: `#gameNav, #signForm, #editor_add, #editor_edit, #articleNav`
    }
};
