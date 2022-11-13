import "./wdyr";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from "@/routes";
import { ReduxProvider } from "@/store";

/**
 * @title react-i18next
 * @see https://react.i18next.com/
 */
import "@/locales"

// hot reload
if (module && module.hot) {
    module.hot.accept();
}

console.log('process.env.NODE_ENV', process.env);

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ReduxProvider>
            <RouterProvider router={router} />
        </ReduxProvider>
    </React.StrictMode>
);
