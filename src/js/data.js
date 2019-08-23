export const guideMenu = {
    bloodborne: {
        gameWorld: {
            name: "عالم اللعبة",
            articles: [
                { title: "عن اللعبة", url: "about_game" },
                { title: "شخصية اللاعب", url: "the_hunter" },
                { title: "المناطق", url: "locations" }
            ]
        },

        equipment: {
            name: "المعدات",
            articles: [{ title: "الملابس", url: "attires" }],
            weapons: {
                name: "الأسلحة",
                articles: [
                    { title: "الأسلحة النارية", url: "firearms" },
                    { title: "الأسلحة القتالية", url: "trick_weapons" }
                ]
            }
        },

        items: {
            name: "العناصر",
            consumerItems: {
                name: "العناصر الأستهلاكية",
                articles: [
                    { title: "قابلة لإعادة الإستخدام", url: "reusable" },
                    { title: "عناصر هجومية", url: "offensive" },
                    { title: "عناصر متنوعة", url: "miscellaneous" }
                ]
            },
            materials: {
                name: "المواد",
                articles: [
                    { title: "مواد التطوير", url: "upgrading" },
                    { title: "Ritual Materials", url: "ritual" }
                ]
            },
            keys: {
                name: "المفاتيح",
                articles: [
                    { title: "مفاتيح", url: "keys" },
                    { title: "ادوات", url: "tools" },
                    { title: "Badges", url: "badges" },
                    { title: "Messengers", url: "messengers" }
                ]
            }
        }
    } // end of bloodborne
};