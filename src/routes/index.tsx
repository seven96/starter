import { defineRouterFactory, RouterTypeEnum } from "./defineRouter";

// layouts
import Layout from "@/layouts";

// pages
import Home from "@/pages/Home";
import About from "@/pages/About";

export const router = defineRouterFactory({
    mode: RouterTypeEnum.Hash,
    routes: [
        {
            path: "/",
            element: <Layout />,
            children: [
                { path: "about", element: <About /> },
                { path: "/", element: <Home /> }
            ]
        }
    ],
});