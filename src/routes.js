import Main from "./pages/mainPage";

const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
    },
    {
        path: "/about",
        name: "about",
        component: () => import("./pages/aboutPage"),
    },
    {
        path: "/datasetInfo/:datasetName",
        name: "datasetInfo",
        component: () => import("./pages/datasetInfoPage"),
    },
    {
        path: "/CheckYourStance",
        name: "CheckYourStances",
        component: () => import("./pages/checkYourStancePage"),
    },
    {
        path: "/chooseAlgorithmPage",
        name: "chooseAlgorithmPage",
        component: () => import("./pages/chooseAlgorithmPage"),
    },
    {
        path: "/resultsPreview/:resultId",
        name: "resultsPreview",
        component: () => import("./pages/resultsPreviewPage"),
    },
    {
        path: "/results/",
        name: "results",
        component: () => import("./pages/resultsPage"),
    },
    {
        path: "/compareResults/",
        name: "compareResults",
        component: () => import("./pages/compareResultsPage"),
    },
    {
        path: "/thanks",
        name: "thanks",
        component: () => import("./pages/emailPage"),
    },
];

export default routes;
