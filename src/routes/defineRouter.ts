import { createBrowserRouter, createHashRouter, createMemoryRouter, RouteObject } from "react-router-dom";
import { Router as RemixRouter, HydrationState } from "@remix-run/router";

export enum RouterTypeEnum {
    History = "history",
    Hash = "hash",

    // TODO: Add support for MemoryRouter
    Memory = "memory",
}

export interface DefineRouterOptions {
    mode: RouterTypeEnum | keyof typeof RouterTypeEnum;
    routes: RouteObject[];
    opts?: {
        basename?: string;
        hydrationData?: HydrationState;
        window?: Window;
    };
}

export const defaultDefineRouterOptions: DefineRouterOptions = {
    mode: RouterTypeEnum.Hash,
    routes: [],
    opts: {}
}

export function defineRouterFactory(options: DefineRouterOptions): RemixRouter {
    const { mode, routes, opts } = { ...defaultDefineRouterOptions, ...options };
    switch (mode) {
        case RouterTypeEnum.History:
            return createBrowserRouter(routes, opts);
        case RouterTypeEnum.Memory:
            return createMemoryRouter(routes, opts);
        case RouterTypeEnum.Hash:
        default:
            return createHashRouter(routes, opts);
    }
}