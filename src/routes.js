import Main from "./pages/mainPage";

const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
    },
    {
        path: "/Statistics",
        name: "Statistics",
        component: () => import("./pages/Statistics"),
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
        path: "/results/:resultId",
        name: "results",
        component: () => import("./pages/resultsPage"),
    },
    {
        path: "/thanks",
        name: "thanks",
        component: () => import("./pages/emailPage"),
    },
];

export default routes;
