/*
  Create guide menu (side or index) HTML structre
*/

import { bloodborne } from "../assets/data";

// Make Markup
const createSection = (name, id, level, url) => {
  const menuLevel = (level === "first") ? "1st" : "2nd";
  const markup = `
        <li id="${id}">
            <button class="sectionBtn">
                <figure>
                  <img src=${url} alt=${name}>
                </figure>
                <i class="fas fa-chevron-left"></i>
                <span>${name}</span>
            </button>
            <ul class="menu__level--${menuLevel} hidden"></ul>
        </li>
    `;
  return markup;
};

const createLink = (name, url, img) => `
  <li>
    <a href=#${url}>
      <figure>
        <img src=${img} alt=${name}>
      </figure>
      <span>${name}</span>
    </a>
  </li>
`;

// Main Sections
const keys = Object.keys(bloodborne);
const names = keys.map(key => bloodborne[key].name);
const imgs = keys.map(key => bloodborne[key].img);

export const createGuideMenu = () => {
  for (let i = 0; i < keys.length; i++) {
    $(".guideMenu").append(createSection(names[i], keys[i], "first", imgs[i]));
  }
  
  // 2nd Sections
  let subSection;
  Object.keys(bloodborne).forEach(mainKey => {
    Object.keys(bloodborne[mainKey]).forEach(key => {
      if (key !== "name" && key !== "img" && key !== "articles") {
        subSection = bloodborne[mainKey][key];
        
        $(`#${mainKey} > ul`).append(createSection(subSection.name, key, 'second', subSection.img));
      }
    });
  });
  
  // 1st Articles
  let articles;
  Object.keys(bloodborne).forEach(mainKey => {
    articles = bloodborne[mainKey].articles;
    if (articles) {
      articles.forEach(article =>
        $(`#${mainKey} > ul`).append(createLink(article.title, article.url, article.img))
      );
    }
  });
  
  // 2nd Articles
  Object.keys(bloodborne).forEach(mainKey => {
    Object.keys(bloodborne[mainKey]).forEach(key => {
      if (key !== "name" && key !== "articles") {
        articles = bloodborne[mainKey][key].articles;
        if (articles) {
          articles.forEach(article =>
            $(`#${key} > ul`).append(createLink(article.title, article.url, article.img))
          );
        }
      }
    });
  });
}