import axios from "axios";
import { DOM } from "./dom";
import { createGuideMenu } from "../components/guide_menu";
import { guideMenuFun } from "../components/comp_funs";
import { pathFun } from "../components/comp_funs";

/* 
    - Insert data from data object to UI
*/

// Game Index
async function loadPage() {
    // set page title
    $(DOM.main.header).find('h1').text('الصفحة الرئيسية للعبة Bloodborne');

    // set page content
    const page = await axios('./articles/main.html'); // must url (in browser) end by / !
    $(DOM.main.main).find('article').html(page.data);

    // create guide menu
    createGuideMenu();

    // add events linserts
    $('.guideMenu').find('button').click(guideMenuFun);
    $('.path').click(pathFun);
}

if (window.location.href.includes('bloodborne')) {
    loadPage()
    console.log("here")
}