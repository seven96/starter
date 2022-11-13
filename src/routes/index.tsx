import { defineRouterFactory, RouterTypeEnum } from "./defineRouter";

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
            path: "/",
            element: <Layout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "about", element: <About /> },
                { path: "store-selector", element: <StoreSelector /> },
                { path: "store-connect", element: <StoreConnect /> }
            ]
        }
    ],
});