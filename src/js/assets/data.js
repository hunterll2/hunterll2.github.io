class guideMenu {
    constructor() {
        // this.name = name;
    }

    addSection(id, name, img) {
        this[id] = {
            name: name,
            img: img,

            articles: []
        }
    }

    addSubSection(parent, id, name, img) {
        this[parent][id] = {
            name: name,
            img: img,

            articles: []
        }
    }

    addArticle({title, img, url, sections}) {
        const   mainSection = sections[0],
                subSection = sections[1],
                obj = subSection ? this[mainSection][subSection] : this[mainSection];

        obj.articles.push({title, img, url});
    }
}

/* Games Guide */
export const games = {
    bloodborne: new guideMenu()
}

const { bloodborne } = games;
/* Add data for BLOODBORNE game */
bloodborne.addSection('gameWorld', 'عالم اللعبة', 'https://i.suar.me/4Engn/s');
bloodborne.addSection('equipment', 'المعدات', 'https://i.suar.me/K2EMo/s');
bloodborne.addSection('items', 'العناصر', 'https://i.suar.me/Q09Bp/s');
bloodborne.addSubSection('items', 'consumables', 'العناصر الإستهلاكية', 'https://i.suar.me/W2ZAd/s');
bloodborne.addSubSection('items', 'materials', 'المواد', 'https://i.suar.me/pqK2A/s');

// Game World Section
bloodborne.addArticle({title: 'عن اللعبة', url: 'about_game', img: 'https://i.suar.me/ooWNP/s', sections: ['gameWorld']});
bloodborne.addArticle({title: 'الصياد', url: 'hunter', img: 'https://i.suar.me/JLWEX/s', sections: ['gameWorld']})
bloodborne.addArticle({title: 'المناطق', url: 'locations', img: 'https://i.suar.me/l4Kvl/s', sections: ['gameWorld']})
bloodborne.addArticle({title: 'الأعداء', url: 'enemies', img: 'https://i.suar.me/z078x/s', sections: ['gameWorld']})
bloodborne.addArticle({title: 'الزعماء', url: 'bosses', img: 'https://i.suar.me/ZqG8p/s', sections: ['gameWorld']})
bloodborne.addArticle({title: 'التجار', url: 'merchants', img: 'https://i.suar.me/Q09Bp/s', sections: ['gameWorld']})

// Equipment Section
bloodborne.addArticle({title: 'الملابس', url: 'attire', img: 'https://i.suar.me/Am0rN/s', sections: ['equipment']})
bloodborne.addArticle({title: 'الأسلحة القتالية', url: 'trickWeapon', img: 'https://i.suar.me/NX320/s', sections: ['equipment']})
bloodborne.addArticle({title: 'الأسلحة النارية', url: 'trickWeapon', img: 'https://i.suar.me/yyKd2/s', sections: ['equipment']})

// Items Section
// -- Consumables
bloodborne.addArticle({title: 'عناصر الاسترداد', url: 'reusable_items', img: 'https://i.suar.me/W2ZAd/s', sections: ['items', 'consumables']})
bloodborne.addArticle({title: 'العناصر الهجومية', url: 'offensive_items', img: 'https://i.suar.me/dZlpz/m', sections: ['items', 'consumables']})
bloodborne.addArticle({title: 'Coldblood', url: 'coldblood', img: 'https://i.suar.me/8AQ1E/m', sections: ['items', 'consumables']})
bloodborne.addArticle({title: 'Arcane / Bloodtinge', url: 'arcane_and_bloodtinge', img: 'https://i.suar.me/O8PzM/s', sections: ['items', 'consumables']})
bloodborne.addArticle({title: 'Multiplayer', url: 'multiplayer', img: 'https://i.suar.me/joK5y/m', sections: ['items', 'consumables']})
bloodborne.addArticle({title: 'عناصر متنوعة', url: 'miscellaneous', img: 'https://i.suar.me/AmA2N/s', sections: ['items', 'consumables']})
// -- Materials
bloodborne.addArticle({title: 'مواد التطوير', url: 'upgrade_materials', img: 'https://i.suar.me/pqK2A/s', sections: ['items', 'materials']})
bloodborne.addArticle({title: 'Ritual Materials', url: 'ritual_materials', img: 'https://i.suar.me/34MA4/s', sections: ['items', 'materials']})
// -- Tools
bloodborne.addArticle({title: 'المفاتيح', url: 'keys', img: 'https://i.suar.me/XaYWB/s', sections: ['items']})
bloodborne.addArticle({title: 'الأدوات', url: 'tools', img: 'https://i.suar.me/ooKp1/s', sections: ['items']})
bloodborne.addArticle({title: 'Badges / الشارات', url: 'badges', img: 'https://i.suar.me/x93pr/s', sections: ['items']})
bloodborne.addArticle({title: 'Messengers / الرسل', url: 'messengers', img: 'https://i.suar.me/704aX/s', sections: ['items']})