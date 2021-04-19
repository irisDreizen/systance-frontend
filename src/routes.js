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
];

export default routes;