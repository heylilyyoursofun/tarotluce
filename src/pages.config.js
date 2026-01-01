import GenerateImages from './pages/GenerateImages';
import GenerateImagesNow from './pages/GenerateImagesNow';
import Home from './pages/Home';
import TarotJournal from './pages/TarotJournal';
import GuidedMeditation from './pages/GuidedMeditation';
import __Layout from './Layout.jsx';


export const PAGES = {
    "GenerateImages": GenerateImages,
    "GenerateImagesNow": GenerateImagesNow,
    "Home": Home,
    "TarotJournal": TarotJournal,
    "GuidedMeditation": GuidedMeditation,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};