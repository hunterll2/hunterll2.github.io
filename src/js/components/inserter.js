import { state } from "./setter";

export const insertPageTitle = () => {
    $("h1").text(state.pageTitle);
}

export const insertPageContent = () => {
    $("");
}