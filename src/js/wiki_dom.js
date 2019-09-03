import { guideMenu } from "./data";

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
        artilceTools: "#articleTools",
        controlTools: "#controlTools",
        allTools: "#siteTools, #editTools, #articleTools, #controlTools"
    }
};

if (window.location.href.includes('bloodborne')) {
    $(DOM.main.header).find('h1').text('الصفحة الرئيسية للعبة Bloodborne');
    $(DOM.main.main).find('article').load('./articles/main.html');
}

// Game Guide
if (window.location.href.includes('bloodborne')) {
    const createSection = (name, id, level) => `
        <li class="${level === 'first' ? 'menu__1st' : 'menu__2nd'}" id="${id}">
            <button>
                <i class="fas fa-chevron-left"></i><span>${name}</span>
            </button>
            <ul>
            </ul>
        </li>
    `;

    const createLink = (name, url) => `<li><a href=#${url}>${name}</a></li>`;

    // Main Sections
    const keys = Object.keys(guideMenu.bloodborne);
    const names = keys.map(key => guideMenu.bloodborne[key].name);

    for (let i = 0; i < keys.length; i++) {
        $(".menu").append(createSection(names[i], keys[i], 'first'));
    }

    // 2nd Sections
    let subSection;
    Object.keys(guideMenu.bloodborne).forEach(mainKey => {
        Object.keys(guideMenu.bloodborne[mainKey]).forEach(key => {
            if (key !== "name" && key !== "articles") {
                subSection = guideMenu.bloodborne[mainKey][key];
                $(`#${mainKey} > ul`).append(createSection(subSection.name, key));
            }
        });
    });

    // 1st Articles
    let articles;
    Object.keys(guideMenu.bloodborne).forEach(mainKey => {
        articles = guideMenu.bloodborne[mainKey].articles;
        if (articles) {
            articles.forEach(article =>
                $(`#${mainKey} > ul`).append(createLink(article.title, article.url))
            );
        }
    });

    // 2nd Articles
    Object.keys(guideMenu.bloodborne).forEach(mainKey => {
        Object.keys(guideMenu.bloodborne[mainKey]).forEach(key => {
            if (key !== "name" && key !== "articles") {
                articles = guideMenu.bloodborne[mainKey][key].articles;
                if (articles) {
                    articles.forEach(article =>
                        $(`#${key} > ul`).append(createLink(article.title, article.url))
                    );
                }
            }
        });
    });
}