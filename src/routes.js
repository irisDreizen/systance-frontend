import Main from "./pages/mainPage";

const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
    },
    {
        path: "/results",
        name: "results",
        component: () => import("./pages/resultsPage"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("./pages/aboutPage"),
    },
    {
        path: "/datasetInfo",
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
];

export default routes;
