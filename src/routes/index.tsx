import { defineRouterFactory, RouterTypeEnum } from "./defineRouter";
import { Paths } from "@/settings";

// layouts
import Layout from "@/layouts";

// pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import StoreSelector from "@/pages/store-test/StoreSelector";
import StoreConnect from "@/pages/store-test/StoreConnect";

export const router = defineRouterFactory({
    mode: RouterTypeEnum.Hash,
    routes: [
        {
            path: Paths.Layout,
            element: <Layout />,
            children: [
                {
                    path: Paths.Home,
                    element: <Home />,
                    children: [
                        { path: Paths.SubPage, element: <StoreSelector /> }
                    ]
                },
                { path: Paths.About, element: <About /> },
                { path: Paths.StoreSelector, element: <StoreSelector /> },
                { path: Paths.StoreConnect, element: <StoreConnect /> }
            ]
        }
    ],
});