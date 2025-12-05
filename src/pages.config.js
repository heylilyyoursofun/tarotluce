import Home from './pages/Home';
import GenerateImages from './pages/GenerateImages';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "GenerateImages": GenerateImages,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};