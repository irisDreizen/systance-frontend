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
];

export default routes;
