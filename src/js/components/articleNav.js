/*
  Create Article Nav HTML structre
*/

export const setTitlesId = (article) => {
    // First thing is set the counter
    let term = "<h2>", termWidth = term.length, curIndex, i = 0;
    let counter = 0;

    do {
    if (i === 0) {
    curIndex = article.indexOf(term);
    i++;
    } else {
    curIndex = article.indexOf(term, curIndex + termWidth);
    }
    
    if (curIndex !== -1) counter++; // not increment at last step
    } while (curIndex !== -1)

    // Collect data
    let startTerm = "<h2>", endTerm = "</h2>", starts = [], ends = [], contents = [], hashs = [];

    starts.push(article.indexOf(startTerm));
    ends.push(article.indexOf(endTerm));

    for (let i = 0; i < (counter - 1); i++) {
        starts.push(article.indexOf(startTerm, starts[i] + 4));
        ends.push(article.indexOf(endTerm, ends[i] + 4));
    }

    for (let i = 0; i < counter; i++) {
        contents.push(article.slice(starts[i] + 4, ends[i]));
        hashs.push(article.slice(starts[i] + 4, ends[i]).replace(/ /g, "_"));
    }

    // Replace & Create Article Nav
    for (let i = 0; i < counter; i++) {
        article = article.replace(`<h2>${contents[i]}</h2>`, `<h2 id="_${hashs[i]}">${contents[i]}</h2>`);

        getArticleNavItems(hashs[i], contents[i]);
    }

    createArticleNav();
    return article;
}

let articleTitlesList = [];
const getArticleNavItems = (hash, content) => {
    const markup = `<li><a href="#_%hash%"><i class="fas fa-paperclip"></i><span>%content%</span></a></li>`;
    let newMarkup;
    
    newMarkup = markup.replace("%hash%", hash);
    newMarkup = newMarkup.replace("%content%", content);

    articleTitlesList.push(newMarkup);
}

const createArticleNav = () => {
    // first empty the container
    $("#articleNav").find("ul").empty();
    
    for (let title of articleTitlesList) {
        $("#articleNav").find("ul").append(title);
    }
    
    // empty the aryy after put all el(s); for futuer use
    articleTitlesList = [];

}